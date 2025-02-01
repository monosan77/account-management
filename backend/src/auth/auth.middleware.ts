import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as cookie from 'cookie';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSession, AuthUser } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

declare module 'express' {
  interface Request {
    user: AuthUser;
  }
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,

    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const cookies = cookie.parse(req.headers.cookie || '');
    const sessionId = cookies.session_id;
    if (!sessionId) {
      throw new UnauthorizedException('認証情報がありません');
    }

    const sessionData = await this.authSessionRepository.findOne({
      where: { session_id: sessionId },
      relations: { user: true },
    });
    if (!sessionData) {
      throw new UnauthorizedException('不正なセッションIDです');
    }
    // セッションの有効期限を確認
    const now = new Date();
    const expires_at = new Date(sessionData.expires_at);
    if (now > expires_at) {
      throw new UnauthorizedException('セッションの有効期限が切れています');
    }
    // ログインから６時間経過後に操作したらセッションを更新する
    const UPDATA_HOURS = 6;
    if (
      now > new Date(expires_at.setDate(expires_at.getHours() - UPDATA_HOURS))
    ) {
      const newSession = await this.authService.updataSessionTable(sessionData);
      this.authService.setCookie(res, newSession.session_id);
    }

    // reqにユーザー情報をセット
    req.user = sessionData.user;
    next();
  }
}
