import { ApiModelProperty } from "@nestjs/swagger";
import { IsString} from 'class-validator';

export class CreateQuestionsDto {
    @ApiModelProperty({example:"Do you sanitize your hands regularly?"})
    @IsString()
    ques: string;
  }