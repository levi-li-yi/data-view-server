/*
 * @Author: Levi Li
 * @Date: 2024-02-21 16:05:34
 * @description:
 */
import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Like, Not, Repository } from 'typeorm';
import * as moment from 'moment';

import { PaginatedDto } from 'src/common/dto/paginated.dto';
import { ApiException } from 'src/common/exceptions/api.exception';
import { DICTTYPE_KEY } from 'src/common/contants/redis.contant';

import {
  ReqAddProjectDto,
  ReqUpdateProjectDto,
  ReqProjectListDto,
  ReqUpdateProjectDataDto,
} from './dto/req-project.dto';
import { Project } from './entities/project.entity';
import { ProjectData } from './entities/project-data.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(ProjectData)
    private readonly projectDataRepository: Repository<ProjectData>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  // 新增项目
  async addProject(reqAddProjectDto: ReqAddProjectDto) {
    const project = await this.findByProject(
      reqAddProjectDto.projectName,
      (reqAddProjectDto as Project).id,
    );
    if (project) throw new ApiException('项目已存在');
    const saveItem = await this.projectRepository.save(reqAddProjectDto);
    return saveItem.id;
  }

  // 编辑项目
  async updateProject(reqUpdateProjectDto: ReqUpdateProjectDto) {
    return this.projectRepository.update(
      reqUpdateProjectDto.id,
      reqUpdateProjectDto,
    );
  }

  // 分页查询项目
  async getProjectList(reqProjectListDto: ReqProjectListDto) {
    const where: FindOptionsWhere<Project> = {};
    if (reqProjectListDto.projectName) {
      where.projectName = Like(`%${reqProjectListDto.projectName}%`);
    }
    const result = await this.projectRepository.findAndCount({
      where,
      order: { createTime: 1 },
      skip: reqProjectListDto.skip,
      take: reqProjectListDto.take,
    });
    return {
      rows: result[0],
      total: result[1],
    };
  }

  // 通过id查询项目
  async oneProject(id: number): Promise<Project> {
    return this.projectRepository.findOneBy({ id });
  }

  // 通过name、id查询项目
  async findByProject(projectName: string, id?: number): Promise<Project> {
    const where: FindOptionsWhere<Project> = { projectName };
    if (id) {
      where.id = Not(id);
    }
    return this.projectRepository.findOne({ where });
  }

  // 通过项目id数组删除项目
  async deleteByProjectIdArr(projectIdArr: string[]) {
    // const projectList = await this.projectRepository.find({
    //   where: { id: In(projectIdArr) },
    // });
    await this.projectRepository.delete(projectIdArr);
  }

  // 新增或者编辑项目数据
  // async addOrUpdateProjectData(
  //   reqUpdateProjectDataDto: ReqUpdateProjectDataDto,
  // ) {
  //   const oneProjectData = await this.findProjectDataByProjectId(
  //     reqUpdateProjectDataDto.projectId,
  //   );
  //   if (oneProjectData) {
  //     return this.projectDataRepository.update(
  //       reqUpdateProjectDataDto.projectId,
  //       reqUpdateProjectDataDto,
  //     );
  //   } else {
  //     return this.projectDataRepository.save(reqUpdateProjectDataDto);
  //   }
  // }

  async addOrUpdateProjectData(projectId: number, content: string) {
    const oneProjectData = await this.findProjectDataByProjectId(projectId);
    if (oneProjectData) {
      return this.projectDataRepository.update(projectId, {
        projectId,
        content,
      });
    } else {
      return this.projectDataRepository.save({ projectId, content });
    }
  }

  // 通过项目ID查找是否有项目数据
  async findProjectDataByProjectId(projectId: number) {
    const where: FindOptionsWhere<ProjectData> = { projectId };
    return this.projectDataRepository.findOne({ where });
  }

  // 获取项目数据
  async getProjectData(projectId: number) {
    const where: FindOptionsWhere<ProjectData> = { projectId };
    const projectData = await this.projectDataRepository.findOne({ where });
    return projectData || null;
  }
}
