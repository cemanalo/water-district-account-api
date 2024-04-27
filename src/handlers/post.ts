import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { initializeApplicationContext } from "../libs/utils/application.context";
import { PostAccountsModule } from "../libs/functions/post/module";
import { dbEnvSecrets } from "../libs/configs/db-config";
import { CreateAccountController } from "../libs/functions/post/create.account.controller";
import { INestApplicationContext } from "@nestjs/common";

let applicationContext: INestApplicationContext = null;

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event, context): Promise<APIGatewayProxyResult> => {
  console.log(event, context);
  const appContext = await initializeApplicationContext(
    applicationContext,
    PostAccountsModule,
    [dbEnvSecrets]
  );

  const controller = appContext.get(CreateAccountController);
  return await controller.do(event, context)
};
