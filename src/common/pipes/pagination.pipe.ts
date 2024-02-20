/*
 * @Author: Levi Li
 * @Date: 2024-02-20 16:52:40
 * @description: 分页管道
 */
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const skip = value.pageNum ? (value.pageNum - 1) * value.pageSize : 0;
    const take = value.pageSize ?? 0;
    value.skip = skip;
    value.take = take;
    return value;
  }
}
