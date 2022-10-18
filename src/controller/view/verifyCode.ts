import { NextFunction, Request, Response } from 'express';
import svgCaptcha from 'svg-captcha';
import { customCodes } from '../../middleware/response/customCodes';

export const verifyCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const captcha = svgCaptcha.create({
      color: true,
      width: 120,
      height: 60,
      fontSize: 60,
      size: 4,
      background: '#111',
      ignoreChars: '0oO1ilIabcdefghjkmnpqrstuvwxyz' // value without these words
    });

    // store into session
    req.session.captcha = captcha.text;

    res.customResponse(customCodes.success, 'success', {
      data: captcha.data
    });
  } catch (err) {
    console.log('err', String(err));
    next(res.customResponse(customCodes.serverError, 'error', null, err));
  }
};
