import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AuthUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

@Entity()
@Unique(['session_id'])
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  session_id: string;

  @OneToOne(() => AuthUser, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: AuthUser;

  @Column({ type: 'timestamp' })
  expires_at: Date;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
