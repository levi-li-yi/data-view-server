import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project-data')
export class ProjectData extends BaseEntity {
  /* 项目参数ID */
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Type()
  @IsNumber()
  id: number;

  /* 项目ID */
  @Column('varchar', {
    name: 'project_id',
    nullable: false,
  })
  @IsNumber()
  projectId: number;

  /* 项目参数内容 */
  @Column('longtext', {
    name: 'content_data',
    nullable: true,
    // length: '',
  })
  @IsOptional()
  contentData: string | null;
}
