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

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  //アカウント情報を全て取得する
  async findAll() {
    const accountData: AccountModel[] = await this.accountRepository.find();
    return accountData;
  }

  async deleteAccount(id: string) {
    const result = await this.accountRepository.delete({
      id: id,
    });
    if (result.affected === 0) {
      throw new NotFoundException('削除できるデーターが存在しませんでした。');
    }
  }

  // 新しいアカウントの作成
  async createAccount(createAccount: CreateAccountDto): Promise<AccountModel> {
    const account = new Account();
    account.name = createAccount.name;
    account.email = createAccount.email;
    account.tel = createAccount.tel;
    const findAccount = await this.accountRepository.find({
      where: { email: account.email },
    });
    if (findAccount) {
      throw new ConflictException('既に存在するメールアドレスです');
    }
    const newAccount: AccountModel = await this.accountRepository.save(account);
    return newAccount;
  }

  async updataAccount(updataAccount: UpdataAccountDto) {
    const account = new Account();
    account.id = updataAccount.id;
    account.name = updataAccount.name;
    account.email = updataAccount.email;
    account.tel = updataAccount.tel;

    const updataData = await this.accountRepository.save(account);
    return updataData;
  }
}
