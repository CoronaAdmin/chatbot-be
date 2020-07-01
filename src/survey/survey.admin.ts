import { AdminEntity } from "nestjs-admin"
import { Survey } from "./entity/survey.entity"

export class SurveyAdmin extends AdminEntity {
    entity = Survey
    listDisplay = [
        'id',
        'name'
    ]
    searchFields = ['id','name']
}