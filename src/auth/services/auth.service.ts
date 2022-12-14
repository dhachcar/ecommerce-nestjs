import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwt: JwtService,
  ) {}

  public async signup(user: UserEntity): Promise<UserEntity> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return await this.userRepository.save(user);
  }

  public async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOneBy({
      username: username,
    });

    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { ...result } = foundUser;
        return result;
      }

      return null;
    }

    return null;
  }

  public async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwt.sign(payload),
    };
  }
}
