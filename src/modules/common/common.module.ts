/*
 * @Author: Levi Li
 * @Date: 2024-02-20 15:46:06
 * @description:
 */
import { Global, Module } from '@nestjs/common';

import { ExcelModule } from './excel/excel.module';
import { UploadModule } from './upload/upload.module';

@Global()
@Module({
  imports: [ExcelModule, UploadModule],
  controllers: [],
  providers: [],
  exports: [ExcelModule],
})
export class CommonModule {}
