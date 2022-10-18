import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { User } from '../../config/typeorm/entities';
import { appDataSource } from '../../data-source';
import { customCodes } from '../../middleware/response/customCodes';
import { formatExpressIp, formatXForwardedFor } from '../../utils';

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.render('login.ejs', { error: '' });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};

export const loginFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.body.username && req.body.password && req.body.code) {
      if (req.body.code !== req.session.captcha) {
        return res.render('login.ejs', { error: '驗證碼錯誤' });
      }
      const userRepository = appDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: {
          username: req.body.username
        }
      });

      if (!!user) {
        const passwordIsCorrect = await bcrypt.compare(
          req.body.password,
          user.password
        );

        if (passwordIsCorrect) {
          const updateUser: User = {
            ...user,
            lastLoginTime: new Date()
          };

          const clientIp =
            formatXForwardedFor(req.headers['x-forwarded-for'] as string) ||
            formatExpressIp(req.ip);

          if (clientIp) {
            updateUser.lastLoginIp = clientIp;
          }

          await userRepository.update(
            { username: user.username },
            { ...updateUser }
          );

          const sessionUser = { id: user.id, username: user.username };
          req.session.user = sessionUser;

          return res.redirect('/notice/g');
        } else {
          return res.render('login.ejs', { error: '密碼錯誤' });
        }
      } else {
        return res.render('login.ejs', {
          error: `找不到該帳號  ${req.body.username}`
        });
      }
    } else {
      return res.render('login.ejs', { error: '請輸入帳號、密碼及驗證碼' });
    }
  } catch (err) {
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
