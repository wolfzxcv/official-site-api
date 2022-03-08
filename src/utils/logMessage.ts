import { logger } from '../config/winston';
import { currentENV } from './currentENV';

type ILogType = 'info' | 'error';

export const logMessage = (message: string, type: ILogType = 'info') => {
  if (currentENV !== 'development') {
    if (type === 'error') {
      logger.error({ message });
    } else {
      logger.info({ message });
    }
  }

  console.log(message);
};
