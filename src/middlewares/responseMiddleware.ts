
import { Response, Request, NextFunction } from 'express';
import { responseFormatter } from '../utils/responseFormatter';

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;

  res.send = (body: any) => {
    const formattedResponse = responseFormatter(true, body, 'Success');
    return originalSend.call(res, formattedResponse);
  };

  next();
};

export default responseMiddleware;
