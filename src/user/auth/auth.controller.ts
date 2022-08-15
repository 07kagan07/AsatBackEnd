import {
  Controller,
  Post,
  Body,
  Param,
  ParseEnumPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { userType } from '@prisma/client';
import { GenerateProductKeyDto, LoginDto, SignupDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup/:UserType')
  async signup(
    @Body() body: SignupDto,
    @Param('UserType', new ParseEnumPipe(userType)) UserType: userType,
  ) {
    if (UserType !== userType.USER) {
      if (!body.productKey) {
        throw new UnauthorizedException();
      }

      const validProductKey = `${body.sicilNo}-${UserType}-${process.env.PRODUCT_KEY_SECRET}`;
      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.productKey,
      );
      if (!isValidProductKey) {
        throw new UnauthorizedException();
      }
    }
    return this.authService.signup(body, UserType);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('/key')
  generateProductKey(@Body() { sicilNo, user_Type }: GenerateProductKeyDto) {
    return this.authService.generateProductKey(sicilNo, user_Type);
  }
}
