import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { userType } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

interface SignupParams {
  sicilNo: string;
  password: string;
  name_surname: string;
}

interface LoginParams {
  sicilNo: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async signup(
    { sicilNo, password, name_surname }: SignupParams,
    UserType: userType,
  ) {
    const userExist = await this.prismaService.user.findUnique({
      where: {
        sicilNo,
      },
    });
    if (userExist) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: {
        sicilNo,
        name_surname,
        password: hashedPassword,
        user_Type: UserType,
      },
    });

    return await this.generateJWT(name_surname, user.id);
  }

  async login({ sicilNo, password }: LoginParams) {
    const user = this.prismaService.user.findUnique({
      where: { sicilNo },
    });
    if (!user) {
      throw new HttpException('Kullanıcı Yok!', 400);
    }

    const hashedPassword = (await user).password;

    const isValidPassword = await bcrypt.compare(password, hashedPassword);

    if (!isValidPassword) {
      throw new HttpException('Şifre Hatalı', 400);
    }

    return await this.generateJWT((await user).name_surname, (await user).id);
  }

  private generateJWT(name_surname: string, id: number) {
    return jwt.sign(
      {
        name_surname,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      { expiresIn: 3600000 },
    );
  }

  generateProductKey(sicilNo: string, user_Type: userType) {
    const string = `${sicilNo}-${user_Type}-${process.env.PRODUCT_KEY_SECRET}`;

    return bcrypt.hash(string, 10);
  }
}
