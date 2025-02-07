import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSigninDto, AuthSignupDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async authSignup(
    @Body() authSignupData: AuthSignupDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.authSignup(authSignupData, res);
    return res.json(result);
  }

  @Post('signin')
  async authSignin(
    @Body() authSigninData: AuthSigninDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.authSignin(
      authSigninData.email,
      authSigninData.password,
      res,
    );

    return res.json(result);
  }

  @Get()
  checkLogin(@Req() req: Request) {
    if (!req.user) {
      throw new UnauthorizedException(
        'requestにユーザー情報が含まれていません',
      );
    }
    return this.authService.checkLogin(req);
  }
}
