import { Response, Request, NextFunction } from 'express';
import { responseFormatter } from '../utils/responseFormatter';

const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json; // Capture la méthode originale `res.json`

    // Surcharge de `res.json` pour ajouter une logique conditionnelle
    res.json = (body: any) => {
        // Si la réponse est déjà formatée (ex: contient `status`, `message`, `data`), on ne la modifie pas
        if (body && typeof body === 'object' && ('status' in body && 'message' in body && 'data' in body)) {
            return originalJson.call(res, body);
        }

        // Sinon, on applique le formattage par défaut
        const formattedResponse = responseFormatter(true, body, 'Success');
        return originalJson.call(res, formattedResponse);
    };

    next();
};

export default responseMiddleware;