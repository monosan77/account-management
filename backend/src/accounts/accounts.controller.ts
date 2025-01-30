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
  @Get()
  async findAll(): Promise<AccountModel[]> {
    return await this.AccountsService.findAll();
  }

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

  @Post()
  @HttpCode(201)
  async createAccount(
    @Body() createAccount: CreateAccountDto,
  ): Promise<AccountModel> {
    return await this.AccountsService.createAccount(createAccount);
  }

  @Put()
  async updataAccount(@Body() updataAccount: UpdataAccountDto) {
    return await this.AccountsService.updataAccount(updataAccount);
  }
}
