import { Repository } from 'typeorm';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from 'src/entities/account.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';

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
    image: 'testImage',
    imageId: 'testImageId',
  };
  const mockAccounts = [
    {
      id: '1',
      name: 'testName',
      email: 'test@example.com',
      tel: '09012345678',
      image: 'testImage',
      imageId: 'testImageId',
    },
    {
      id: '1',
      name: 'testName',
      email: 'test@example.com',
      tel: '09012345678',
      image: 'testImage',
      imageId: 'testImageId',
    },
  ];
  const image: Express.Multer.File = {
    buffer: Buffer.from('test image buffer'),
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
    size: 0,
    stream: Readable.from(Buffer.from('test image buffer')),
    destination: '',
    filename: '',
    path: '',
  };
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
      jest
        .spyOn(cloudinary.uploader, 'destroy')
        .mockResolvedValue({ result: 'ok' });
      await expect(
        accountsService.deleteAccount('1', 'imageId'),
      ).resolves.toEqual({
        success: true,
      });
    });
    test('削除が失敗したとき、エラーをスローすることを確認', async () => {
      const deleteReturn = {
        raw: [],
        affected: 0,
      };
      jest.spyOn(accountRepository, 'delete').mockResolvedValue(deleteReturn);
      await expect(
        accountsService.deleteAccount('1', 'imageId'),
      ).rejects.toThrow(NotFoundException);
    });
  });
  describe('createAccount', () => {
    const createAccountInfo = {
      name: 'testName',
      email: 'test@example',
      tel: '09012345678',
      image: 'testImage',
      imageId: 'testImageId',
    };
    const responseCloudinary: UploadApiResponse = {
      public_id: 'exampleId',
      version: 1571218330,
      signature: 'exampleSignature',
      width: 500,
      height: 500,
      format: 'jpg',
      resource_type: 'image',
      created_at: '2017-06-26T19:46:03Z',
      bytes: 120253,
      type: 'upload',
      url: 'example.path',
      secure_url: 'example.path',
      tags: [],
      pages: 0,
      etag: '',
      placeholder: false,
      access_mode: '',
      original_filename: '',
      moderation: [],
      access_control: [],
      context: {} as object,
      metadata: {} as object,
    };
    test('正常にアカウントを作成できたときにアカウント情報を返す事を確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue([]);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      const mockUploadStream = jest
        .fn()
        .mockImplementation(
          (callback: (error: any, result: UploadApiResponse) => void) => {
            callback(null, responseCloudinary);
            return { end: jest.fn() };
          },
        );
      jest
        .spyOn(cloudinary.uploader, 'upload_stream')
        .mockImplementation(mockUploadStream);

      expect(
        await accountsService.createAccount(createAccountInfo, image),
      ).toBe(mockAccount);
    });
    test('emailが重複する場合エラーをスローすることを確認', async () => {
      jest.spyOn(accountRepository, 'find').mockResolvedValue(mockAccounts);
      await expect(
        accountsService.createAccount(createAccountInfo, image),
      ).rejects.toThrow(ConflictException);
    });
  });
  describe('updataAccount', () => {
    test('正常に更新されアカウントデータを返すことを確認', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      expect(await accountsService.updataAccount(mockAccount, image)).toBe(
        mockAccount,
      );
    });
    test('重複するmailが見つかったときエラーをスローすることを確認', async () => {
      const dummyAccount = {
        id: '2',
        name: 'dummyName',
        email: 'dummyTest@example.com',
        tel: '09012345678',
        image: 'dummyImage',
        imageId: 'dummyImageId',
      };
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(dummyAccount);
      await expect(
        accountsService.updataAccount(mockAccount, image),
      ).rejects.toThrow(ConflictException);
    });
    test('重複するmailが自身の物の場合はエラーを出さす正常にデータを返すことを確認', async () => {
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(mockAccount);
      jest.spyOn(accountRepository, 'save').mockResolvedValue(mockAccount);
      expect(await accountsService.updataAccount(mockAccount, image)).toBe(
        mockAccount,
      );
    });
  });
});
