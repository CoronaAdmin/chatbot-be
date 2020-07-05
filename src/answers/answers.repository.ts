import { EntityRepository, Repository, getRepository, Connection } from 'typeorm';
import { AccountRepository } from "./../account/account.repository";
import { CreateAnswersDto } from "./dto/answers.dto";
import { Answers } from "./entity/answers.entity";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entity/account.entity';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
@EntityRepository(Answers)
export class AnswersRepository extends Repository<Answers> {

    getUserResponse = async(userid:number,accountRepository:AccountRepository) => {
        let savedUserResponse
    
        try{
            
            const savedResponse = await getRepository(Answers)
            .createQueryBuilder("answer")
            .where("answer.user_id = :id", { id: userid})
            .getOne();

            if(savedResponse){
                return {
                    message:"User response fetched successfully",
                    savedResponse
                }
            }
            else{
                return {
                    error:"Couldn't fetch the user and his rresponse"
                }
            }
        }
        catch(err){
            console.log(err)
            return {
                statusCode:400,
                error:"Error fetching the user reponse"
            }
        }
    }

    submitResponse = async (createAnswersDto:CreateAnswersDto,userid:number,accountRepository:AccountRepository) => {
        const {response} = createAnswersDto
        const answer = new Answers()
        let result 
        let savedUserResponse
    
        const savedResponse = await getRepository(Answers)
        .createQueryBuilder("answer")
        .where("answer.user_id = :id", { id: userid })
        .getOne();
        if(savedResponse)
        {
            savedUserResponse = savedResponse.response
            let finalResponse = Object.assign(savedUserResponse,response)
            try{
                savedResponse.response=finalResponse 
                savedResponse.user_id = userid 
                await savedResponse.save()
                .then(res=>{
                    result = res
                })
                return {
                    status:201,
                    message:"successfully saved response",
                    result:result
                }
            }
            catch(err){
                console.log("cant save response!!",err)
            }

        }

        else{
            try{
                answer.response = response
                answer.user_id = userid
                await answer.save()
                .then(res=>{
                    result = res
                })
                return {
                    status:201,
                    message:"successfully saved response",
                    result:result
                }
            }
            catch(err){
                console.log("cant save response!!",err)
            }
        }
    };
    downloadCsv = async()=>{
        try {
        await this.queryRunner.query('COPY `answer` TO `answers.csv` DELIMITER `,` CSV HEADER')
        } catch(e)
        {
                throw new HttpException(e,HttpStatus.BAD_REQUEST)
        }
    }
}