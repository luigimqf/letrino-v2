import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Match } from './Match';
import { User } from './User';

@Entity('guest_sessions')
export class GuestSession {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'claimedByUserId' })
  claimedBy: User | null;

  @Column({ type: 'uuid', nullable: true })
  claimedByUserId: string | null;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastSeenAt: Date;

  @Column({ type: 'varchar', length: 64, nullable: true })
  ipHash: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true })
  userAgentHash: string | null;

  @OneToMany(() => Match, match => match.guestSession)
  matches: Match[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value + 'Z'),
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => new Date(value + 'Z'),
    },
  })
  updatedAt: Date;
}
