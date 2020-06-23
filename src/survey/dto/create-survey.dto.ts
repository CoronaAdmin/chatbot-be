import { ApiModelProperty } from "@nestjs/swagger";

export class CreateSurveyDto {
    @ApiModelProperty({example:"Covid-19 survey"})
    name: string;
  }