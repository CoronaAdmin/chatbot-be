import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
import { Survey } from 'src/survey/entity/survey.entity';
  
  @Entity('questions')
  @Unique(['id','ques'])
  export class Questions extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    ques: string;

    @ManyToOne(type=>Survey, survey=> survey.questions)
    @JoinColumn({name:'survey_id'})
    survey: Survey;

    // @ManyToOne(type => Survey, survey => survey.qsns)
    // survey: Survey;

  }