import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token not provided' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Invalid token' });
      return;
    }

    req.user = decoded as DecodedToken;
    next();
  });
};

export default verifyToken;
