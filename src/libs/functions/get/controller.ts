import { Injectable, Logger } from "@nestjs/common";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { AccountService } from "../../services/account.service";

@Injectable()
export class GetAccountsController {
  constructor(private logger: Logger, private accountService: AccountService) {}

  async do(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    this.logger.log('Get /accounts api triggered', context)
    const accounts = await this.accountService.findAll();
    return {
      statusCode: 200,
      body: JSON.stringify(accounts)
    }
  }
}
