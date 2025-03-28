import { Module } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camera])],
  providers: [CamerasService],
  controllers: [CamerasController],
})
export class CamerasModule {}
