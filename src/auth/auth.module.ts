import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth.service';

@Module({
  imports: [JwtModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService],
})
export class AuthModule {}
