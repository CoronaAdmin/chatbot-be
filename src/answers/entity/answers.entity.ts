import { Account } from "./../../account/entity/account.entity";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
    ManyToOne,
    JoinColumn,
    OneToOne,
  } from 'typeorm';
  
  @Entity('answers')
  export class Answers extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:'jsonb',nullable:true})
    response:any;

    @OneToOne(type => Account)
    @JoinColumn({name:'user_id'})
    user: Account;

  }