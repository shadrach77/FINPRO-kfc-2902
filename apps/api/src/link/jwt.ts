import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '@/config';

export const generateToken = (payload: any, expiresIn: string = '1hr') => {
  return sign(payload, JWT_SECRET, { expiresIn });
};
