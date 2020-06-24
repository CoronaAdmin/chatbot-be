import { EntityRepository, Repository, getRepository } from 'typeorm';
import { SurveyRepository } from "./../survey/survey.repository";
import { Questions } from "./entity/questions.entity";
import { CreateQuestionsDto } from './dto/questions.dto';

@EntityRepository(Questions)
export class QuestionsRepository extends Repository<Questions> {
    createQuestions = async (createQuestionsDto:CreateQuestionsDto,id:number,surveyRepository:SurveyRepository) => {
        const {ques} = createQuestionsDto
        const question = new Questions()
        // const surveyRepository = await getRepository(SurveyRepository)
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