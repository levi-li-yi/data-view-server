/*
 * @Author: Levi Li
 * @Date: 2024-02-20 14:48:31
 * @description: 数据对象构建类
 */
export class DataObj<A> {
  private data: A;

  constructor(data: A) {
    this.data = data;
  }

  static create<A>(data: A) {
    return new DataObj<A>(data);
  }
}
