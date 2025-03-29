import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from './entities/camera.entity';
import { CreateCameraDto } from './dto/create-camera.dto';

@Injectable()
export class CamerasService {
  constructor(
    @InjectRepository(Camera)
    private camerasRepository: Repository<Camera>,
  ) {}

  async create(createCameraDto: CreateCameraDto): Promise<Camera> {
    const camera = this.camerasRepository.create(createCameraDto);
    return this.camerasRepository.save(camera);
  }

  async findAll(): Promise<Camera[]> {
    return this.camerasRepository.find();
  }
}
