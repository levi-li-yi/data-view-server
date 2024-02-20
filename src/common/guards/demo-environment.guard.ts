/*
 * @Author: Levi Li
 * @Date: 2024-02-20 16:42:28
 * @description: 演示环境守卫
 */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class DemoEnvironmentGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isDemoEnvironment =
      this.configService.get<boolean>('isDemoEnvironment');
    if (!isDemoEnvironment) return true;
    const request: Request = context.switchToHttp().getRequest();
    // 此处因演示环境原因 处理特殊用户 不限制接口, 此块代码可以根据实际情况移除
    const authorization = request.headers['authorization'];
    if (!authorization) return true;
    const payload = await this.jwtService.verify(authorization.slice(7));
    if (+payload?.userId === -1) return true;
    // === end
    const allowUrlArr = [
      '/login',
      '/logout',
      '/web/user/login',
      '/web/user/reg',
      '/user-collect',
      '/user-rate',
      '/user-movie',
    ]; //放过的路由
    if (
      request.method.toLocaleLowerCase() != 'get' &&
      !allowUrlArr.includes(request.url)
    )
      throw new ApiException('演示环境,不允许操作');
    return true;
  }
}
