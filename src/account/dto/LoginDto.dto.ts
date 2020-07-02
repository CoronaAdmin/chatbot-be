import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class LoginDto{
    @ApiModelProperty({example:null})
    @IsEmail()
    email: string;
}
