import { ApiModelProperty } from "@nestjs/swagger";
import { IsObject} from 'class-validator';

export class CreateAnswersDto {
    @ApiModelProperty({example:{
        "Body temperature":36,
        "Coughing":"No",
        "Location":"Ernakulam",
        "Date":"2020-06-26"
    }})
    @IsObject()
    response: any;
  }