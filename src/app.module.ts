import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TaskModule],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
