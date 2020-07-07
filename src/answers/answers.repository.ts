import { EntityRepository, Repository, getRepository, Connection } from 'typeorm';
import { AccountRepository } from "./../account/account.repository";
import { CreateAnswersDto } from "./dto/answers.dto";
import { Answers } from "./entity/answers.entity";
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExportToCsv } from 'export-to-csv';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/account/entity/account.entity';
import { async } from 'rxjs/internal/scheduler/async';
import { dirname } from 'path';
import { QuestionsRepository } from 'src/questions/questions.repository';
const fs = require('fs')
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
    downloadCsv = async(questionsRepository:QuestionsRepository)=>{
        try{
        const query = this.createQueryBuilder('answer')
        const data = await query.getRawMany()
        console.log(data)
        const count = data.length
        let finalArray =[]
        for (var j=0;j<count;j++){
         
            for (const i in data[j].answer_response)
         {
            const question = await questionsRepository.findOne({id:Number(i)})
            console.log("questions",question.ques)
            let questionTitle = question.ques.replace(/(\r\n|\n|\r)/gm,"") //someText.replace(/(\r\n|\n|\r)/gm,"");
            data[j][questionTitle]=data[j].answer_response[i]
        }
        delete data[j].answer_response
    }
    console.log(data)
    
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Answer CSV',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
         
        const csvExporter = new ExportToCsv(options);
        const fs = require('fs')
        const csvData = csvExporter.generateCsv(JSON.stringify(data), true)
        fs.writeFileSync('data.csv',csvData)
        return {
            sucess:true,
        }
        
    }
    catch(e){
        throw new HttpException(e,HttpStatus.CONFLICT)
    }
       
    
    }
}