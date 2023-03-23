import { Request, Response } from 'express';
import { User } from '../modules/user/user.entity';

export interface ICTX {
  req: Request;
  res: Response;
  user: User | null;
}

export interface IJWTPayload {
  userId: number;
}
