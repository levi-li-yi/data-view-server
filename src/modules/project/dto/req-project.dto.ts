import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParamsDto } from 'src/common/dto/params.dto';
import { Project } from '../entities/project.entity';
import { ProjectData } from '../entities/project-data.entity';

/* 新增项目 */
// export class ReqAddProjectDto extends OmitType(Project, ['id' as const]) {}
export class ReqAddProjectDto extends Project {}

// 编辑项目
export class ReqUpdateProjectDto extends PartialType(ReqAddProjectDto) {
  @IsNumber()
  id: number;
}

/* 分页查询项目列表 */
export class ReqProjectListDto extends PaginationDto {
  /* 项目名称 */
  @IsOptional()
  @IsString()
  projectName?: string;

  @IsOptional()
  @IsObject()
  params?: ParamsDto;
}

/* 编辑项目数据 */
export class ReqUpdateProjectDataDto extends OmitType(ProjectData, [
  'projectId',
] as const) {
  @IsNumber()
  projectId: number;
}
