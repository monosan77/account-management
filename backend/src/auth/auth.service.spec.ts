import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { AuthSession, AuthUser } from 'src/entities/user.entity';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('auth.service.tsのテスト', () => {
  let authService: AuthService;
  let authUserRepository: Repository<AuthUser>;
  let authSessionRepository: Repository<AuthSession>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      // controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AuthUser),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AuthSession),
          useClass: Repository,
        },
      ],
    }).compile();
    authService = moduleRef.get<AuthService>(AuthService);
    authUserRepository = moduleRef.get<Repository<AuthUser>>(
      getRepositoryToken(AuthUser),
    );
    authSessionRepository = moduleRef.get<Repository<AuthSession>>(
      getRepositoryToken(AuthSession),
    );
  });
  const mockUserData = {
    id: '1',
    name: 'testName',
    email: 'test@example.com',
    password: 'N11111111',
  };
  const mockSessionData = {
    id: '1',
    session_id: '001',
    user: mockUserData,
    expires_at: new Date('2020-10-10'),
    create_at: new Date('2020-10-10'),
    update_at: new Date('2020-10-10'),
  };
  const res: Partial<Response> = {
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn(),
  };
  describe('authSignup', () => {
    const mockSignupDto = {
      name: 'testName',
      email: 'test@test.com',
      password: 'N11111111',
    };
    test('正常に登録できることを確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(null);
      jest.spyOn(authUserRepository, 'save').mockResolvedValue(mockUserData);
      jest
        .spyOn(authService, 'createSessionTable')
        .mockResolvedValue(mockSessionData);

      expect(
        await authService.authSignup(mockSignupDto, res as Response),
      ).toEqual({
        message: '登録完了',
      });
    });
    test('重複するmailがあったときエラーをスローする事を確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(mockUserData);
      await expect(
        authService.authSignup(mockSignupDto, res as Response),
      ).rejects.toThrow(ConflictException);
    });
  });
  describe('authSignin', () => {
    test('正常にログイン処理ができることを確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(mockUserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest
        .spyOn(authSessionRepository, 'findOne')
        .mockResolvedValue(mockSessionData);
      jest
        .spyOn(authService, 'updataSessionTable')
        .mockResolvedValue(mockSessionData);
      await expect(
        authService.authSignin('test@test.com', 'N11111111', res as Response),
      ).resolves.toEqual({
        message: 'ログイン完了',
      });
    });
    test('mailが違うときエラーをスローすることを確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(null);
      await expect(
        authService.authSignin('test@test.com', 'N11111111', res as Response),
      ).rejects.toThrow(UnauthorizedException);
    });
    test('パスワードが違うときエラーをすることを確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(mockUserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false as never);
      await expect(
        authService.authSignin('test@test.com', 'N11111111', res as Response),
      ).rejects.toThrow(UnauthorizedException);
    });
    test('ログイン時にセッションんが存在しないときセッションが作成されること確認', async () => {
      jest.spyOn(authService, 'findUserInfo').mockResolvedValue(mockUserData);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true as never);
      jest.spyOn(authSessionRepository, 'findOne').mockResolvedValue(null);
      const createSessionTableSpy = jest
        .spyOn(authService, 'createSessionTable')
        .mockResolvedValue(mockSessionData);
      jest
        .spyOn(authService, 'updataSessionTable')
        .mockResolvedValue(mockSessionData);
      await authService.authSignin(
        'test@test.com',
        'N11111111',
        res as Response,
      );
      expect(createSessionTableSpy).toHaveBeenCalledWith(mockUserData);
    });
  });
});
