import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { AuthSession, AuthUser } from 'src/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';

describe('auth.controllerのテスト', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(AuthUser),
          useClass: Repository,
        },
        { provide: getRepositoryToken(AuthSession), useClass: Repository },
      ],
    }).compile();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  const mockSigninDto = {
    email: 'test@example.com',
    password: 'N11111111',
  };
  const mockSignupDto = {
    name: 'testName',
    email: 'test@example.com',
    password: 'N11111111',
  };

  describe('signin', () => {
    test('正常にログインできログイン完了メッセージを返すことを確認', async () => {
      const res: Partial<Response> = {
        json: jest.fn().mockReturnThis(),
      };
      jest
        .spyOn(authService, 'authSignin')
        .mockResolvedValue({ message: 'ログイン完了' });
      await authController.authSignin(mockSigninDto, res as Response);
      expect(res.json).toHaveBeenCalledWith({ message: 'ログイン完了' });
    });
  });
  describe('signup', () => {
    test('正常に登録完了メッセージを返すことを確認', async () => {
      const res: Partial<Response> = {
        json: jest.fn().mockReturnThis(),
      };
      jest
        .spyOn(authService, 'authSignup')
        .mockResolvedValue({ message: '登録完了' });
      await authController.authSignup(mockSignupDto, res as Response);
      expect(res.json).toHaveBeenCalledWith({ message: '登録完了' });
    });
  });
  describe('checkLogin', () => {
    test('reqにuserがなければエラーをスローすることを確認する', () => {
      const req: Partial<Request> = {
        user: undefined,
      };
      expect(() => authController.checkLogin(req as Request)).toThrow(
        UnauthorizedException,
      );
    });
    test('reqからuserを受け取りuserを正常に返すことを確認', () => {
      const mockUser = {
        userId: '1',
        name: 'testName',
        email: 'test@example.com',
      };
      const req: Partial<Request> = {
        user: mockUser,
      };
      expect(authController.checkLogin(req as Request)).toBe(mockUser);
    });
  });
});
