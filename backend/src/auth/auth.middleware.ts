import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as cookie from 'cookie';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSession } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

declare module 'express' {
  interface Request {
    user: { userId: string; name: string; email: string };
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

    // reqにユーザー情報をセット
    req.user = {
      userId: sessionData.user.id,
      name: sessionData.user.name,
      email: sessionData.user.email,
    };

    next();
  }
}
