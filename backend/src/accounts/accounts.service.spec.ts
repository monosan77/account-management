import { Repository } from 'typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from 'src/entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

describe('AccountsService', () => {
  let accountsService: AccountsService;
  let accountRepository: Repository<Account>;

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
    accountRepository = moduleRef.get<Repository<Account>>(
      getRepositoryToken(Account),
    );
  });
  const mockAccount = {
    id: '1',
    name: 'testName',
    email: 'test@example.com',
    tel: '09012345678',
  };
  const mockAccounts = [
    {
      id: '1',
      name: 'testName',
      email: 'test@example.com',
      tel: '09012345678',
    },
    {
      id: '1',
      name: 'testName',
      email: 'test@example.com',
      tel: '09012345678',
    },
  ];
  describe('findOneAccount', () => {
    test('データを取得し正常にデータを返されること', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(mockAccount);
      expect(await accountsService.findOneAccount('1')).toBe(mockAccount);
    });
    test('データが存在しないときエラーをスローすることを確認', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);
      await expect(accountsService.findOneAccount('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('findAll', () => {
    test('正常にデータを全て取得することを確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue(mockAccounts);
      expect(await accountsService.findAll()).toBe(mockAccounts);
    });
    test('データを取得できないときエラーをスローすることを確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue([]);
      await expect(accountsService.findAll()).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('deleteAccount', () => {
    test('削除成功時にsuccess:trueが返ることを確認', async () => {
      const deleteReturn = {
        raw: [],
        affected: 1,
      };
      jest.spyOn(accountRepository, 'delete').mockResolvedValue(deleteReturn);
      await expect(accountsService.deleteAccount('1')).resolves.toEqual({
        success: true,
      });
    });
    test('削除が失敗したとき、エラーをスローすることを確認', async () => {
      const deleteReturn = {
        raw: [],
        affected: 0,
      };
      jest.spyOn(accountRepository, 'delete').mockResolvedValue(deleteReturn);
      await expect(accountsService.deleteAccount('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
  describe('createAccount', () => {
    const createAccountInfo = {
      name: 'testName',
      email: 'test@example',
      tel: '09012345678',
    };
    test('正常にアカウントを作成できたときにアカウント情報を返す事を確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue([]);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      expect(await accountsService.createAccount(createAccountInfo)).toBe(
        mockAccount,
      );
    });
    test('emailが重複する場合エラーをスローすることを確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue(mockAccounts);
      await expect(
        accountsService.createAccount(createAccountInfo),
      ).rejects.toThrow(ConflictException);
    });
  });
  describe('updataAccount', () => {
    test('正常に更新されアカウントデータを返すことを確認', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      expect(await accountsService.updataAccount(mockAccount)).toBe(
        mockAccount,
      );
    });
    test('重複するmailが見つかったときエラーをスローすることを確認', async () => {
      const dummyAccount = {
        id: '2',
        name: 'dummyName',
        email: 'dummyTest@example.com',
        tel: '09012345678',
      };
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(dummyAccount);
      await expect(accountsService.updataAccount(mockAccount)).rejects.toThrow(
        ConflictException,
      );
    });
    test('重複するmailが自身の物の場合はエラーを出さす正常にデータを返すことを確認', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(mockAccount);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      expect(await accountsService.updataAccount(mockAccount)).toBe(
        mockAccount,
      );
    });
  });
});
