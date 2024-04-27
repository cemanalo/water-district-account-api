import { Injectable, Logger } from "@nestjs/common";
import { CreateAccountUseCase } from "./create.account.usecase";
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Account } from "../../entities/account.entity";
import { validate as classValidator } from "class-validator";
import { plainToInstance } from "../../utils/class.transformer";

@Injectable()
export class CreateAccountController {
  constructor(private logger: Logger, private useCase: CreateAccountUseCase) {}

  async do(
    event: APIGatewayProxyEvent,
    context: Context
  ): Promise<APIGatewayProxyResult> {
    try {
      const data = JSON.parse(event.body);
      this.logger.log("Creating account");

      const account = plainToInstance(Account, data)

      await this.validate(account);
      const result = await this.useCase.execute(data);

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

    });
    if (validationErrors.length > 0) {
      this.logger.error(validationErrors)
      throw new Error('Invalid request body')
    }
  }
}
