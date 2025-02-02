import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthSigninDto, AuthSignupDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async authSignup(@Body() authSignupData: AuthSignupDto) {
    return this.authService.authSignup(authSignupData);
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
}
