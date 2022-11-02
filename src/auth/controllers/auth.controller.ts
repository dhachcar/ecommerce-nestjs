import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/auth/entities/user.entity';
import { AuthService } from 'src/auth/services/auth.service';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  public async signup(@Body() user: UserEntity): Promise<UserEntity> {
    return this.authService.signup(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Req() req) {
    return this.authService.login(req.user);
  }
}
