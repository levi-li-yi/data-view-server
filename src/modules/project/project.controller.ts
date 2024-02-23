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
} from './dto/req-project.dto';
import { Project } from './entities/project.entity';
import { ProjectData } from './entities/project-data.entity';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('项目管理')
@ApiBearerAuth()
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  /* 新增项目 */
  @RepeatSubmit()
  @Post('project/create')
  // @RequiresPermissions('project:dict:add')
  async addProject(
    @Body() reqAddProjectDto: ReqAddProjectDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqAddProjectDto.createBy = reqAddProjectDto.updateBy = userName;
    const itemId = await this.projectService.addProject(reqAddProjectDto);
    return { id: itemId };
  }

  /* 分页查询项目列表 */
  @Get('project/list')
  // @RequiresPermissions('project:dict:add')
  @ApiPaginatedResponse(Project)
  async getProjectList(
    @Query(PaginationPipe) reqProjectListDto: ReqProjectListDto,
  ): Promise<PaginatedDto<Project>> {
    return this.projectService.getProjectList(reqProjectListDto);
  }

  /* 删除项目 */
  @Delete('project/delete')
  // @RequiresPermissions('project:dict:remove')
  async deleteProject(@Query('ids') ids: string) {
    console.log('del', ids);
    await this.projectService.deleteByProjectIdArr(ids.split(','));
  }

  /* 编辑项目 */
  @RepeatSubmit()
  @Put('project/edit')
  // @RequiresPermissions('project:dict:edit')
  async updateProject(
    @Body() project: Project,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    project.updateBy = userName;
    await this.projectService.updateProject(project);
  }

  /* 发布项目 */
  @RepeatSubmit()
  @Put('project/publish')
  async publishProject(
    @Body() project: Project,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    project.updateBy = userName;
    await this.projectService.updateProject(project);
  }

  /* 保存项目数据 */
  @RepeatSubmit()
  @Post('project/save/data')
  async saveProjectData(
    @Body() reqUpdateProjectDataDto: ReqUpdateProjectDataDto,
    @User(UserEnum.userName, UserInfoPipe) userName: string,
  ) {
    reqUpdateProjectDataDto.createBy = reqUpdateProjectDataDto.updateBy =
      userName;
    await this.projectService.addOrUpdateProjectData(reqUpdateProjectDataDto);
  }

  /* 获取项目数据 */
  @Get('project/getData')
  @Public()
  @ApiDataResponse(typeEnum.object, ProjectData)
  async getProjectData(@Query('projectId') id: number) {
    return this.projectService.getProjectData(id);
  }
}
