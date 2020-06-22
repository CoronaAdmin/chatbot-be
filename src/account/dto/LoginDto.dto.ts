import { ApiModelProperty } from "@nestjs/swagger";


export class LoginDto{
    @ApiModelProperty({example:null})
    email: string;
}