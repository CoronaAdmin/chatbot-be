import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Survey } from './entity/survey.entity';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { json } from 'express';

@EntityRepository(Survey)
export class SurveyRepository extends Repository<Survey> {

  getSurveys = async () =>{
    try{
      const surveys = await getRepository(Survey)
      .createQueryBuilder("survey")
      .getMany()
      if(surveys){
        return {
          message:"Survey list fetched successfully",
          surveys
        }
      }
    }
    catch(err){
      return "Cannot fetch survey list"
      console.log(err)
    }
  }

  createSurvey = async (createSurveyDto:CreateSurveyDto) => {
      const {name} = createSurveyDto
      const survey = new Survey()
      let result
    try{
        survey.name = name
        await survey.save()
        .then(res=>{
          result=res
        })
        return {
            status:201,
            result:result,
            message:"successfully created survey"
        }
    }
    catch(err){
        console.log("cant create survey!!",err)
    }

  };
}