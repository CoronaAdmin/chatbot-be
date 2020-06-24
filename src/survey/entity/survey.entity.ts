import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
    OneToMany,
  } from 'typeorm';
import { Questions } from 'src/questions/entity/questions.entity';
import { type } from 'os';
  
  @Entity('survey')
  @Unique(['id','name'])
  export class Survey extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
    
    @CreateDateColumn()
    createdAt: Date;
  
    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(type=>Questions,questions=>questions.survey,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })

    // questions: Questions[]
    // @OneToMany(type => Questions, question => question.survey)
    questions: Questions[];
  }