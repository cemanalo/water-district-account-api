import { Injectable, Logger } from "@nestjs/common";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Account } from "../../entities/account.entity";
import { validate as classValidator } from "class-validator";
import { plainToInstance } from "../../utils/class.transformer";
import { validateNumber } from "../../utils/validation.util";
import { AccountService } from "../../services/account.service";

@Injectable()
export class PatchAccountController {
  constructor(private logger: Logger, private accountService: AccountService) {}

  async do(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      const data = JSON.parse(event.body);
      this.logger.log("Creating Account");

      const id = event.pathParameters.id
      validateNumber(id)

      const account = plainToInstance(Account, data)
      await this.validate(account);

      const result = await this.accountService.patchById(Number(id), account)

      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (err) {
      const error = err as Error;
      this.logger.error(error);
      return {
        statusCode: 500,
        body: error.message,
      };
    }
  }

  async validate(data: Account) {
    this.logger.log("Validating data");
    console.log(data)

    const validationErrors = await classValidator(data, {
      skipMissingProperties: true
    });
    if (validationErrors.length > 0) {
      this.logger.error(validationErrors)
      throw new Error('Invalid request body')
    }
  }
}
