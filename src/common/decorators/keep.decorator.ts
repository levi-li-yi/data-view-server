/*
 * @Author: Levi Li
 * @Date: 2024-02-20 16:11:37
 * @description: 保持原数据返回的装饰器
 */
import { SetMetadata } from '@nestjs/common';
import { KEEP_KEY } from '../contants/decorator.contant';

export const Keep = () => SetMetadata(KEEP_KEY, true);
