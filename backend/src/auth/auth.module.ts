import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession, AuthUser } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthUser, AuthSession])],
  controllers: [AuthController],
  providers: [AuthService, AuthSession],
  exports: [TypeOrmModule, AuthService],
})
export class AuthModule {}
