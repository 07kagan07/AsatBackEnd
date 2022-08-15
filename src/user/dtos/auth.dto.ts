import { userType } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEnum,
  IsOptional,
} from 'class-validator';
export class SignupDto {
  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  name_surname: string;

  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  @Length(11, 11, { message: '11 Karkter uzunluğunda olmalı' })
  sicilNo: string;

  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  productKey?: string;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  @Length(11, 11, { message: '11 Karkter uzunluğunda olmalı' })
  sicilNo: string;

  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  password: string;
}

export class GenerateProductKeyDto {
  @IsString()
  @IsNotEmpty({ message: 'Bu Alan Boş Bıraklımaz!!' })
  @Length(11, 11, { message: '11 Karkter uzunluğunda olmalı' })
  sicilNo: string;

  @IsEnum(userType)
  user_Type: userType;
}
