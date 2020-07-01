import { EntityRepository, Repository, getRepository, getConnection } from 'typeorm';
import { SurveyRepository } from "./../survey/survey.repository";
import { Questions } from "./entity/questions.entity";
import { CreateQuestionsDto } from './dto/questions.dto';
import { syncBuiltinESMExports } from 'module';
import { async } from 'rxjs/internal/scheduler/async';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {

    getQuestions = async() =>{
        try{
            const questions = await getRepository(Questions)
            .createQueryBuilder("questions")
            .getMany()
            if(questions){
              return {
                message:"Questions list fetched successfully",
                questions
              }
            }
          }
          catch(err){
            return "Cannot fetch questions list"
            console.log(err)
          }
    }

    getSurveyQuestions = async(surveyId:number,surveyRepository:SurveyRepository) => {
      try{
        const [survey,count]= await surveyRepository.findAndCount({id:surveyId})
        if(count<=0){
          return {
            Error:"Such a survey does not exists!!"
          }
        }
        const questions = await getRepository(Questions)
        .createQueryBuilder("question")
        .where("question.survey_id = :id", { id: surveyId })
        .getMany()
        if(questions){
          return{
            message:"Questions for survey id "+surveyId+" are fetched successfully!!",
            questions,
            survey
          }
        }
        else{
          return{
            statusCode:400,
            result:"Couldn't fetch survey questions!!"
          }
        }
        
      }catch(err){
        console.log(err)
        return {
          statusCode:400,
          result:"Error fetching survey questions!!"
        }
      }
    }

    deleteQuestion = async (ques_id:number) => {

      let result
      try{
        const question = await getRepository(Questions)
        .createQueryBuilder("question")
        .where("id = :id", { id: ques_id }).getOne()
        if(!question){
          return{
            message:"Such a question doesn't exxists!!"
          }
        }
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from(Questions)
          .where("id = :id", { id: ques_id })
          .execute()
          .then(res=>{
            result = res
          })
          
        if(result){
          return {
            statusCode:201,
            message:"Question Successfully Deleted!!"
          }
        }
          
      }catch(err){
        console.log(err)
        return {
          error:"Couldn't perform delete question operation!!"
        }
      }
    }
    createQuestions = async (createQuestionsDto:CreateQuestionsDto,id:number,surveyRepository:SurveyRepository) => {
        const {ques} = createQuestionsDto
        const question = new Questions()
        let result 
        const survey = await surveyRepository.findOne(id)
        if(!survey){
            return {
                status:404,
                error:"Survey Not Found"
            }
        }
      try{
          question.ques = ques
          question.survey = survey
          await question.save()
          .then(res=>{
              result = res
          })
          return {
              status:201,
              message:"successfully created question",
              result:result
          }
      }
      catch(err){
          console.log("cant create question!!",err)
      }
  
    };
}