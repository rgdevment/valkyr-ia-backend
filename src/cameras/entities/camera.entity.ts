import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Camera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  ip: string;

  @Column({ default: 80 })
  port: number;

  @Column({
    type: 'enum',
    enum: ['ONVIF', 'RTSP'],
    default: 'ONVIF',
  })
  protocol: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: '1080p' })
  resolution: string;

  @Column({ default: true })
  isActive: boolean;

  get streamUrl(): string {
    return this.protocol === 'RTSP'
      ? `rtsp://${this.username}:${this.password}@${this.ip}:${this.port}/stream1`
      : `http://${this.ip}:${this.port}/onvif/device_service`;
  }
}
