import { Test } from '@nestjs/testing';
import { AccountModel, AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Repository } from 'typeorm';
import { Account } from 'src/entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('AccountsController', () => {
  let accountsController: AccountsController;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AccountsController],
      providers: [
        AccountsService,
        {
          provide: getRepositoryToken(Account),
          useClass: Repository,
        },
      ],
    }).compile();

    accountsService = moduleRef.get<AccountsService>(AccountsService);
    accountsController = moduleRef.get<AccountsController>(AccountsController);
  });

  describe('findOneAccount', () => {
    test('アカウントが見つかった場合アカウントを返す', async () => {
      const account = {
        id: '1',
        name: 'test',
        email: 'example@test.com',
      };
      jest
        .spyOn(accountsService, 'findOneAccount')
        .mockResolvedValue(account as AccountModel);
      expect(await accountsController.findOneAccount('1')).toBe(account);
    });
    test('クエリパラメーターを受け取らなかったらエラーをスローする', async () => {
      const account = {
        id: '1',
        name: 'test',
        email: 'example@test.com',
      };
      jest
        .spyOn(accountsService, 'findOneAccount')
        .mockResolvedValue(account as AccountModel);
      await expect(accountsController.findOneAccount('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  describe('findAll', () => {
    const accounts = [
      {
        id: '1',
        name: 'test',
        email: 'example@test.com',
        tel: '000-0000-0000',
      },
    ];
    test('全てのアカウントを返す', async () => {
      jest.spyOn(accountsService, 'findAll').mockResolvedValue(accounts);
      expect(await accountsController.findAll()).toBe(accounts);
    });
  });
  describe('deleteAccount', () => {
    test('アカウントが削除された場合204を返す', async () => {
      jest
        .spyOn(accountsService, 'deleteAccount')
        .mockResolvedValue({ success: true });
      await expect(accountsController.deleteAccount('1')).resolves.toEqual({
        success: true,
      });
    });
    test('クエリパラメーターを受け取らなかったらエラーをスローする', async () => {
      jest.spyOn(accountsService, 'deleteAccount').mockRejectedValue(null);
      await expect(accountsController.deleteAccount('')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
  describe('createAccount', () => {
    test('アカウントが作成された場合201を返す', async () => {
      const account = {
        name: 'test',
        email: 'example@test.com',
        tel: '000-0000-0000',
      };
      const newAccount = {
        id: '1',
        name: 'test',
        email: 'example@test.com',
        tel: '000-0000-0000',
      };
      jest
        .spyOn(accountsService, 'createAccount')
        .mockResolvedValue(newAccount);
      expect(await accountsController.createAccount(account)).toBe(newAccount);
    });
  });
  describe('updataAccount', () => {
    test('アカウントが更新された場合200を返す', async () => {
      const account = {
        id: '1',
        name: 'test',
        email: 'example@test.com',
        tel: '000-0000-0000',
      };
      jest.spyOn(accountsService, 'updataAccount').mockResolvedValue(account);
      expect(await accountsController.updataAccount(account)).toBe(account);
    });
  });
});
