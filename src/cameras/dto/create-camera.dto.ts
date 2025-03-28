import { IsEnum, IsIP, IsNumber, IsString, Min, Max } from 'class-validator';

enum Protocol {
  ONVIF = 'ONVIF',
  RTSP = 'RTSP',
}

export class CreateCameraDto {
  @IsString()
  name: string;

  @IsIP()
  ip: string;

  @IsNumber()
  @Min(1)
  @Max(65535)
  port: number;

  @IsEnum(Protocol)
  protocol: Protocol;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
