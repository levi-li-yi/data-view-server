/*
 * @Author: Levi Li
 * @Date: 2024-02-19 16:50:57
 * @description:
 */
import { ExistingProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';

/* 将 provider的类名作为别名，方便定时器调用 */
const providers = [];

function createAliasProviders(): ExistingProvider[] {
  const aliasProviders: ExistingProvider[] = [];
  for (const p of providers) {
    aliasProviders.push({
      provide: p.name,
      useExisting: p,
    });
  }
  return aliasProviders;
}

const aliasProviders = createAliasProviders();

@Module({
  imports: [
    // 配置文件模块
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // 公共模块
    // 业务模块
  ],
  providers: [...aliasProviders],
})
export class AppModule {}
