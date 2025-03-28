import { Controller, Get, Post, Body } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { Camera } from './entities/camera.entity';
import { CreateCameraDto } from './dto/create-camera.dto';

@Controller('cameras')
export class CamerasController {
  constructor(private readonly camerasService: CamerasService) {}

  @Post()
  async create(@Body() createCameraDto: CreateCameraDto): Promise<Camera> {
    return this.camerasService.create(createCameraDto);
  }

  @Get()
  async findAll(): Promise<Camera[]> {
    return this.camerasService.findAll();
  }
}
