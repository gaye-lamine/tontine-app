// src/middleware/responseMiddleware.ts

import { Response, Request, NextFunction } from 'express';
import { responseFormatter } from '../utils/responseFormatter';

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Sauvegarder la méthode originale de la réponse
  const originalSend = res.send;

  // Remplacer la méthode send pour appliquer le format
  res.send = (body: any) => {
    const formattedResponse = responseFormatter(true, body, 'Success');
    return originalSend.call(res, formattedResponse);
  };

  next();
};

export default responseMiddleware;
