/*
 * @Author: Levi Li
 * @Date: 2024-02-19 16:50:57
 * @description:
 */
import { ExistingProvider, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from './modules/common/common.module';
import { LoginModule } from './modules/login/login.module';

import { CacheModule } from './modules/monitor/cache/cache.module';
import { JobModule } from './modules/monitor/job/job.module';
import { JobService } from './modules/monitor/job/job.service';
import { LogModule } from './modules/monitor/log/log.module';
import { OnlineModule } from './modules/monitor/online/online.module';
import { ServerModule } from './modules/monitor/server/server.module';

import { AuthModule } from './modules/system/auth/auth.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { DictModule } from './modules/system/dict/dict.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { NoticeModule } from './modules/system/notice/notice.module';
import { PostModule } from './modules/system/post/post.module';
import { RoleModule } from './modules/system/role/role.module';
import { SysConfigModule } from './modules/system/sys-config/sys-config.module';
import { UserModule } from './modules/system/user/user.module';

import { ProjectModule } from './modules/project/project.module';

/* 将 provider的类名作为别名，方便定时器调用 */
const providers = [JobService];

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
    SharedModule,

    // 基础业务模块
    CommonModule,
    LoginModule,
    AuthModule,
    UserModule,
    DictModule,
    SysConfigModule,
    NoticeModule,
    PostModule,
    DeptModule,
    MenuModule,
    RoleModule,
    LogModule,
    OnlineModule,
    JobModule,
    ServerModule,
    CacheModule,

    // 核心业务模块
    ProjectModule,
  ],
  providers: [...aliasProviders],
})
export class AppModule {}
