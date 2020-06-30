import { AdminEntity } from "nestjs-admin"
import { Questions } from "./entity/questions.entity"

export class QuestionsAdmin extends AdminEntity {
    entity = Questions
    listDisplay = [
        'id',
        'ques',

    ]
    searchFields = ['id','ques']
}