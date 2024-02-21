/*
 * @Author: Levi Li
 * @Date: 2024-02-21 16:05:11
 * @description:
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { DataObj } from 'src/common/class/data-obj.class';
import {
  ApiDataResponse,
  typeEnum,
} from 'src/common/decorators/api-data-response.decorator';
import { ApiPaginatedResponse } from 'src/common/decorators/api-paginated-response.decorator';
import { Keep } from 'src/common/decorators/keep.decorator';
import { RepeatSubmit } from 'src/common/decorators/repeat-submit.decorator';
import { RequiresPermissions } from 'src/common/decorators/requires-permissions.decorator';
import { User, UserEnum } from 'src/common/decorators/user.decorator';
import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { UserInfoPipe } from 'src/common/pipes/user-info.pipe';

import { ProjectService } from './project.service';
import {
  ReqAddProjectDto,
  ReqProjectListDto,
  ReqUpdateProjectDataDto,
  ReqAddProjectDataDto,
} from './dto/req-project.dto';
import { Project } from './entities/project.entity';
import { ProjectData } from './entities/project-data.entity';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('项目管理')
@ApiBearerAuth()
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /* 新增项目 */
  @RepeatSubmit()
  @Post('project/create')
  // @RequiresPermissions()
  async addProject(
    @Body() reqAddProjectDto: ReqAddProjectDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddProjectDto.createBy = reqAddProjectDto.updateBy = userName;
    await this.projectService.addOrUpdateProject(reqAddProjectDto);
  }

  /* 分页查询项目列表 */
}
