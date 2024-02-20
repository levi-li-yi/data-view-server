/*
 * @Author: Levi Li
 * @Date: 2024-02-20 16:05:07
 * @description:
 */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const DataScopeSql = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.dataScope;
  },
);
