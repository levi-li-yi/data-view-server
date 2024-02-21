/*
 * @Author: Levi Li
 * @Date: 2024-02-21 08:14:02
 * @description:
 */
import { IsString } from 'class-validator';

export class ReqLoginDto {
  /* uuid */
  @IsString()
  uuid: string;

  /* 验证码code */
  @IsString()
  code: string;

  /* 用户名 */
  @IsString()
  username: string;

  /* 密码 */
  @IsString()
  password: string;
}
