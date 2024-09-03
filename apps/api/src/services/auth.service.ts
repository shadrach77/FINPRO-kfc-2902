import { ErrorHandler } from '@/helpers/response';
import { generateToken } from '@/link/jwt';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Request } from 'express';

interface IUser {
  id: number;
  phone_number: string;
  gender: string;
  birth_date: Date;
  email: string;
  password?: string;
  full_name: string;
}

export class AuthService {
  static async login(req: Request) {
    const { phone_number, password } = req.body;
    const user = (await prisma.user.findUnique({
      where: {
        phone_number,
      },
    })) as IUser;
    if (!user) {
      throw new ErrorHandler('user not found', 404);
    }
    const checkPassword = await compare(password, user.password!);
    if (checkPassword) {
      delete user.password;
    } else throw new ErrorHandler('wrong password', 400);
    const token = generateToken(user);
    return token;
  }

  static async register(req: Request) {
    const {
      email,
      password,
      phone_number,
      gender,
      date,
      month,
      year,
      full_name,
    } = req.body;
    console.log(req.body, 'test');

    const hashPassword = await hash(password, 10);
    const data: Prisma.UserCreateInput = {
      email,
      password: hashPassword,
      phone_number,
      gender,
      birth_date: new Date(year, month - 1, date),
      full_name,
    };

    if (req?.file) {
      const image = req.file;
      data.image = image.filename;
    }

    return await prisma.user.create({ data });
  }
}
