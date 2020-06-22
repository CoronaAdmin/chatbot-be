import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';

@Injectable()
export class AccountService {
  private logger = new Logger('Account Service');
  constructor(
    @InjectRepository(AccountRepository)
    private readonly accountRepository: AccountRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateAccount(email: string): Promise<any> {
    const checkaccount = await this.accountRepository.findOne({ email: email });
    if (checkaccount) {
      return checkaccount;
    } else return false;
  }
  async getUser(req: any): Promise<any> {
    if (req.user.type === 'ashaworker') {
      const { ashaWorkerId } = req.user;

      const ashaworker = await this.accountRepository.findOne({
        ashaWorkerId: ashaWorkerId,
      });
      if (ashaworker) {
        this.logger.verbose(`Faculty Logged In ${ashaworker.name}`);
        const { ...result } = ashaworker;
        delete result.id;
        let finalresult = { ...result, type: 'ashaworker' };
        return {
          success: true,
          message: 'Success',
          data: finalresult,
        };
      }
    } else {
      return {
        success: true,
        message: 'Success',
        data: {
          type: 'commonfolk',
        },
      };
    }
  }

  async login(data: LoginDto): Promise<any> {
    const account = await this.validateAccount(data.email);
    if (account) {
      const { email, ashaWorkerId } = account;
      console.log(email,ashaWorkerId)
      const payload = { email, ashaWorkerId, type: 'ashaworker' };
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.jwtService.sign(payload),
      };
    } else {
      const email = data.email;
      const payload = { email, type: 'commonfolk' };
      return {
        success: true,
        // eslint-disable-next-line @typescript-eslint/camelcase
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
