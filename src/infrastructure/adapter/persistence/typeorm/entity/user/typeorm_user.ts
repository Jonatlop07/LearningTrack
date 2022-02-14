import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user')
export class TypeOrmUser {
  @PrimaryColumn({
    name: 'id',
    type: 'bigint',
    nullable: false,
    primary: true
  })
  public id: number;

  @Column({
    name: 'email',
    type: 'varchar',
    length: '125',
    nullable: false
  })
  public email: string;

  @Column({
    name: 'password',
    type: 'text',
    nullable: false
  })
  public password: string;

  @Column({
    name: 'username',
    type: 'varchar',
    length: '40',
    nullable: false
  })
  public username: string;

  @Column({
    name: 'created_at',
    type: 'date',
    nullable: false
  })
  public created_at: Date;
}
