import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_CONSTANTS } from './constants/constants';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_CONSTANTS.SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
