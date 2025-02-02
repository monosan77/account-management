import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignupDto } from './dto/auth.dto';
import { AuthSession, AuthUser } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthUser)
    private authUserRepository: Repository<AuthUser>,

    @InjectRepository(AuthSession)
    private authSessionRepository: Repository<AuthSession>,
  ) {}
  // サインアップ時の関数
  async authSignup(authSignupData: AuthSignupDto) {
    const findUser = await this.findUserInfo(authSignupData.email);
    if (findUser) {
      throw new ConflictException('既に登録済みのメールアドレスです');
    }
    // パスワードのハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(authSignupData.password, salt);

    // エンティティに適応
    const auth = new AuthUser();
    auth.name = authSignupData.name;
    auth.email = authSignupData.email;
    auth.password = hashedPass;

    // DBにPOST
    const userData = await this.authUserRepository.save(auth);

    // セッションIDを生成する
    await this.createSessionTable(userData);

    return { message: '登録完了' };
  }

  // サインイン処理
  async authSignin(email: string, password: string, res: Response) {
    const findUser = await this.findUserInfo(email);
    if (!findUser) {
      throw new NotFoundException('メールアドレスが違います。');
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
      throw new UnauthorizedException('パスワードが違います');
    }

    const session = new AuthSession();
    session.session_id = uuid();
    session.user = findUser;
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24); //セッション期限1日

    // セッションにPOST
    let findSession = await this.authSessionRepository.findOne({
      where: { user: { id: findUser.id } },
    });
    if (!findSession) {
      // セッション情報がない時セッションを作成
      findSession = await this.createSessionTable(findUser);
    }
    await this.updataSessionTable(findSession);

    // クッキーにセッションIDをセット
    res.cookie('session_id', findSession.session_id, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { message: 'ログイン完了' };
  }

  // authUserのuser情報を取得する
  async findUserInfo(email: string): Promise<AuthUser | null> {
    const findUser = await this.authUserRepository.findOne({
      where: { email: email },
    });
    return findUser;
  }

  // 新しくauthSessionテーブルのデータを作成
  async createSessionTable(userInfo: AuthUser): Promise<AuthSession> {
    const session = new AuthSession();
    session.session_id = uuid();
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24); //セッション期限1日
    session.user = userInfo;
    const newSession = await this.authSessionRepository.save(session);
    return newSession;
  }

  // セッションIDの更新関数
  async updataSessionTable(session: AuthSession): Promise<AuthSession> {
    session.session_id = uuid();
    session.expires_at = new Date(Date.now() + 1000 * 60 * 60 * 24); //セッション期限1日
    return await this.authSessionRepository.save(session);
  }

  setCookie(res: Response, session_id: string) {
    res.cookie('session_id', session_id, {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return;
  }
}
