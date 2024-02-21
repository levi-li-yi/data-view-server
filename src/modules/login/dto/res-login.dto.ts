/*
 * @Author: Levi Li
 * @Date: 2024-02-21 08:14:11
 * @description:
 */
import { User } from 'src/modules/system/user/entities/user.entity';

export class ResImageCaptchaDto {
  /* base64编码 */
  img: string;

  /* uuid */
  uuid: string;
}

export class ResLoginDto {
  /* token */
  token: string;
}

export class ResInfo {
  /* 权限标识 */
  permissions: string[];

  /* 角色标识 */
  roles: string[];

  /* 用户信息 */
  user: User;
}
