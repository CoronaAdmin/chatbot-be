import { ApiModelProperty } from "@nestjs/swagger";
import { IsString} from 'class-validator';

export class CreateSurveyDto {
    @ApiModelProperty({example:"Covid-19 survey"})
    @IsString()
    name: string;
  }