import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
// import { Excel } from 'src/modules/common/excel/excel.decorator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('project')
export class Project extends BaseEntity {
  /* 项目ID */
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Type()
  @IsOptional()
  @IsNumber()
  id: number;

  /* 项目名称 */
  @Column('varchar', {
    name: 'project_name',
    length: 50,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  projectName: string | null;

  /* 状态 */
  @Column('int', {
    name: 'state',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  state: number | null;

  /* 是否已删除 */
  @Column('int', {
    name: 'is_delete',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  isDelete: number | null;

  /* 图示 */
  @Column('varchar', {
    name: 'index_image',
    nullable: true,
    length: 200,
  })
  @IsOptional()
  @IsString()
  indexImage: string | null;

  /* 备注 */
  @Column('varchar', {
    name: 'remarks',
    nullable: true,
    length: 200,
  })
  @IsOptional()
  @IsString()
  remarks: string | null;
}
