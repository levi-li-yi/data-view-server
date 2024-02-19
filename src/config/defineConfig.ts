/*
 * @Author: Levi Li
 * @Date: 2024-02-19 17:09:20
 * @description:
 */
import { Logger } from '@nestjs/common';

// 判断系统是否是开发环境
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

export default () => {
  let envConfig: IConfig = {};
  try {
    envConfig = require(`./config.${
      process.env.NODE_ENV || 'development'
    }`).default;
    //将文件上传路径绑定到环境变量上
    process.env.uploadPath = envConfig.uploadPath ?? '/upload';
  } catch (e) {
    const logger = new Logger('ConfigModule');
    logger.error(e);
  }

  return envConfig;
};

// 配置文件接口
export interface IConfig {
  /**
   * 后台管理jwt token密钥
   */
  jwt?: {
    secret: string;
  };

  /**
   * 文件上传路径， 绝对路径  例如： E:/upload/test
   */
  uploadPath?: string;

  /**
   * 静态文件前缀地址
   */
  publicPath?: string;

  /**
   * 默认图片地址
   */
  defaultImg?: string;

  /**
   * 数据库配置
   */
  database?: {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    autoLoadModels: boolean; // 如果为true，模型将自动载入（默认:false)
    synchronize?: boolean; //如果为true，自动载入的模型将同步
    logging?: any;
  };

  /**
   * redis 配置
   */
  redis?: {
    config: {
      url: string;
    };
  };

  /* 队列配置 */

  bullRedis?: {
    host: string;
    port: string;
    password: string;
  };

  /* 是否演示环境 */
  isDemoEnvironment?: boolean;

  /* 阿里oss */
  aliOss?: {
    region: string;
    accessKeyId: string;
    accessKeySecret: string;
    bucket: string;
    cname?: boolean;
    endpoint?: string;
    timeout: number;
  };
}
