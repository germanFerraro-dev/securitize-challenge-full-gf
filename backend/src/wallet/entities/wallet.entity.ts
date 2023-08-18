import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['address'])
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
