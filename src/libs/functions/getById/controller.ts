import { Injectable, Logger } from "@nestjs/common";
import { AccountService } from "../../services/account.service";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import { validateNumber } from "../../utils/validation.util";

@Injectable()
export class GetAccountByIdController {
  constructor(private logger: Logger, private accountService: AccountService) {}

  async do(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    this.logger.log("GetAccountByIdController triggered");
    this.logger.log(JSON.stringify(event));

    const id = event.pathParameters.id;
    validateNumber(id);

    const account = await this.accountService.findOneById(Number(id));

    return {
      statusCode: 200,
      body: JSON.stringify(account),
    };
  }
}
