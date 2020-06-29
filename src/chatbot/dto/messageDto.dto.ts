import { ApiModelProperty } from "@nestjs/swagger";
import { IsString} from 'class-validator';

export class MessageDto {
    @ApiModelProperty({example:"Hello,who are you?"})
    @IsString()
    message: string;
  }