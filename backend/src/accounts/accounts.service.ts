import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto, UpdataAccountDto } from './dto/create-account.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { Repository } from 'typeorm';
import { AccountModel } from './accounts.controller';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  //特定のアカウントを取得する
  async findOneAccount(id: string): Promise<AccountModel> {
    const accountData: Account | null = await this.accountRepository.findOne({
      where: { id: id },
    });
    if (!accountData) {
      throw new NotFoundException(
        '指定のアカウントデータが見つかりませんでした。',
      );
    }
    return accountData;
  }

  //アカウント情報を全て取得する
  async findAll(): Promise<AccountModel[]> {
    const accountData: AccountModel[] = await this.accountRepository.find();

    if (accountData.length === 0) {
      throw new NotFoundException('データを取得できませんでした。');
    }
    return accountData;
  }

  // アカウントを削除する
  async deleteAccount(id: string) {
    const result = await this.accountRepository.delete({
      id: id,
    });
    if (result.affected === 0) {
      throw new NotFoundException('削除できるデーターが存在しませんでした。');
    }
    return { success: true };
  }

  // 新しいアカウントの作成
  async createAccount(
    createAccount: CreateAccountDto,
    image: Express.Multer.File,
  ): Promise<AccountModel> {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log(image);
    const findAccount = await this.accountRepository.find({
      where: { email: createAccount.email },
    });
    if (findAccount.length > 0) {
      throw new ConflictException('既に存在するメールアドレスです');
    }
    // ファイルを同期的に読み込む
    const postImageResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream((error, result) => {
            if (error) {
              reject(new Error(error.message));
            } else {
              resolve(result as UploadApiResponse);
            }
          })
          // bufferにエラーが出ちゃう理由分からない
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          .end(image.buffer);
      },
    );
    console.log(postImageResult.secure_url, 'idaoufdapoiup');
    const account = new Account();
    account.name = createAccount.name;
    account.email = createAccount.email;
    account.tel = createAccount.tel;
    account.image = postImageResult.secure_url;

    const newAccount: AccountModel = await this.accountRepository.save(account);
    return newAccount;
  }

  // アカウントの更新
  async updataAccount(updataAccount: UpdataAccountDto) {
    const account = new Account();
    account.id = updataAccount.id;
    account.name = updataAccount.name;
    account.email = updataAccount.email;
    account.tel = updataAccount.tel;

    const findAccount = await this.accountRepository.findOne({
      where: { email: account.email },
    });
    if (findAccount && account.id !== findAccount?.id) {
      throw new ConflictException('既に存在するメールアドレスです');
    }

    const updataData = await this.accountRepository.save(account);
    return updataData;
  }
}
