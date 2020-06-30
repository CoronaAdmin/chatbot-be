import { AdminEntity } from "nestjs-admin"
import { Answers } from "./entity/answers.entity"

export class AnswersAdmin extends AdminEntity {
    entity = Answers
    listDisplay = [
        'id',
        'user_id'
    ]
    searchFields = ['id','user_id']
}