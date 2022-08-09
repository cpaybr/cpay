import { NextFunction, Response } from 'express';
import IUserRequest from '../../infra/interfaces/UserRequestInterface';
import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

export default (request: IUserRequest, response: Response, next: NextFunction) => {
    dotenv.config();
    const secret = process.env.JWT_SECRET || '';
    const authHeader = request.headers.authorization;

    if (!authHeader)
        return response.status(401).json({ success: false, status: 401, message: "No token provided" });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return response.status(401).json({ success: false, status: 401, message: "Token error" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return response.status(401).json({ success: false, status: 401, message: "Token error" });

    jsonwebtoken.verify(token, secret, (err: any, decoded: any) => {
        if (err) return response.status(401).json({ success: false, status: 401, message: "Invalid token" });

        request.user = {
            _id: '',
            businessUnitId: '',
            isAdmin: false
        }

        request.user._id = decoded.id;
        request.user.businessUnitId = decoded.companyId;
        request.user.isAdmin = decoded.isAdmin;

        if (request.user.isAdmin) {
            return next();
        } else {
            return response.status(401).json({ success: false, status: 401, message: "Unauthorized" });
        }
    });
}
