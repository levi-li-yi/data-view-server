/*
 * @Author: Levi Li
 * @Date: 2024-02-21 16:05:23
 * @description: 看板项目模块
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { ProjectData } from './entities/project-data.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectData])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
