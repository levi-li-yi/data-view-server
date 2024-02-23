import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project-data')
export class ProjectData extends BaseEntity {
  /* 项目参数ID */
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Type()
  @IsOptional()
  @IsNumber()
  id: number;

  /* 项目ID */
  @Column('int', {
    name: 'project_id',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  projectId: number | null;

  /* 项目参数内容 */
  @Column('longtext', {
    name: 'content',
    nullable: true,
    // length: '',
  })
  @IsOptional()
  content: string | null;
}
