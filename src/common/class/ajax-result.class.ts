/*
 * @Author: Levi Li
 * @Date: 2024-02-20 14:48:18
 * @description: 返回值封装对象
 */

export class AjaxResult {
  readonly code: number;
  readonly msg: string;
  [key: string]: any;

  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    Object.assign(this, data);
  }

  static success(data?: any, msg = '操作成功') {
    return new AjaxResult(200, msg, data ? { data: { ...data } } : null);
  }

  static error(msg = '操作失败', code = 500) {
    return new AjaxResult(code, msg, null);
  }
}
