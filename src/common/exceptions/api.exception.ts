/*
 * @Author: Levi Li
 * @Date: 2024-02-20 16:36:26
 * @description: 自定义异常
 */
import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  private readonly errCode: number;
  constructor(msg: string, errCode?: number) {
    //权限问题一律使用401错误码
    if (errCode && errCode == 401) {
      super(msg, 200);
      this.errCode = 401;
    } else {
      //其他异常一律使用500错误码
      super(msg, errCode ?? 200);
      this.errCode = errCode ?? 500;
    }
  }
  getErrCode(): number {
    return this.errCode;
  }
}
