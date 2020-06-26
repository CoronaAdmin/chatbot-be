import { Account } from "./../../account/entity/account.entity";
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
  } from 'typeorm';
  
  @Entity('answers')
  export class Answers extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'jsonb',nullable:true})
    response:any;

    @Column()
    user_id: number;

  }