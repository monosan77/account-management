import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdataAccountDto } from './dto/create-account.dto';

export type AccountModel = {
  id: string;
  name: string;
  email: string;
  tel: string;
};

@Controller('account')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}

  // 特定のアカウントを取得
  @Get('oneAccount')
  async findOneAccount(@Query('id') id: string): Promise<AccountModel> {
    if (!id) {
      throw new BadRequestException('リクストエラー：IDが指定されていません');
    }
    return this.AccountsService.findOneAccount(id);
  }

  // 全てのアカウントを取得
  @Get('allAccount')
  async findAll(): Promise<AccountModel[]> {
    return await this.AccountsService.findAll();
  }

  // アカウントを削除
  @Delete()
  @HttpCode(204)
  deleteAccount(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException(
        'リクストエラー：削除するIDが指定されていません',
      );
    }
    return this.AccountsService.deleteAccount(id);
  }

  // アカウントを追加
  @Post()
  @HttpCode(201)
  async createAccount(
    @Body() createAccount: CreateAccountDto,
  ): Promise<AccountModel> {
    return await this.AccountsService.createAccount(createAccount);
  }

  // アカウントを編集
  @Put()
  async updataAccount(@Body() updataAccount: UpdataAccountDto) {
    return await this.AccountsService.updataAccount(updataAccount);
  }
}
