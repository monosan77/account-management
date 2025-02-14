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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto, UpdataAccountDto } from './dto/create-account.dto';
import { FileInterceptor } from '@nestjs/platform-express';

export type AccountModel = {
  id: string;
  name: string;
  email: string;
  tel: string;
  image: string;
  imageId: string;
};

@Controller('account')
export class AccountsController {
  constructor(private readonly AccountsService: AccountsService) {}
  // ****************
  // 特定のアカウントを取得
  // ****************
  @Get('oneAccount')
  async findOneAccount(@Query('id') id: string): Promise<AccountModel> {
    if (!id) {
      throw new BadRequestException('リクストエラー：IDが指定されていません');
    }
    return this.AccountsService.findOneAccount(id);
  }
  // ****************
  // 全てのアカウントを取得
  // ****************
  @Get('allAccount')
  async findAll(): Promise<AccountModel[]> {
    return await this.AccountsService.findAll();
  }
  // ****************
  // アカウントを削除
  // ****************
  @Delete()
  @HttpCode(204)
  async deleteAccount(@Query('id') id: string) {
    if (!id) {
      throw new BadRequestException(
        'リクストエラー：削除するIDが指定されていません',
      );
    }
    return await this.AccountsService.deleteAccount(id);
  }
  // ****************
  // アカウントを追加
  // ****************
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image'))
  // createAccount(
  async createAccount(
    @UploadedFile() image: Express.Multer.File,
    @Body() createAccount: CreateAccountDto,
  ): Promise<AccountModel> {
    if (!image) {
      throw new Error('Image file is required');
    }
    return await this.AccountsService.createAccount(createAccount, image);
  }
  // ****************
  // アカウントを編集
  // ****************
  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async updataAccount(
    @UploadedFile() image: Express.Multer.File,
    @Body() updataAccount: UpdataAccountDto,
  ): Promise<AccountModel> {
    console.log(image);
    console.log(updataAccount);
    return await this.AccountsService.updataAccount(updataAccount, image);
  }
}
