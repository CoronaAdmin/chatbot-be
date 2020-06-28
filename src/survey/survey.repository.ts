import { EntityRepository, Repository, getRepository, getConnection } from 'typeorm';
import { Questions } from "./../questions/entity/questions.entity";
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

  deleteSurvey = async (survey_id:number) => {

    let result
    try{
      const getsurvey = await getRepository(Survey)
      .createQueryBuilder("survey")
      .where("id = :id", { id: survey_id }).getOne()
      if(!getsurvey){
        return{
          message:"Such a survey doesn't exists!!"
        }
      }
      //this will delete the survey and questions of that particular survey
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Survey)
        .where("id = :id", { id: survey_id })
        .execute()
        .then(res=>{
          getConnection()
          .createQueryBuilder()
          .delete()
          .from(Questions)
          .where("survey_id = :id", { id: survey_id })
          .execute()
      })

        return {
        statusCode:201,
        message:"Survey Successfully Deleted!!"
        }

    }catch(err){
      console.log(err)
      return {
        error:"Couldn't perform delete survey operation!!"
      }
    }
  }
}