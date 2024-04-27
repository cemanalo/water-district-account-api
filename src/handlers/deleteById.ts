import { INestApplicationContext } from "@nestjs/common";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { dbEnvSecrets } from "../libs/configs/db-config";
import { initializeApplicationContext } from "../libs/utils/application.context";
import { DeleteAccountByIdController } from "../libs/functions/delete/controller";
import { DeleteAccountByIdModule } from "../libs/functions/delete/module";

let applicationContext: INestApplicationContext = null;

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event, context): Promise<APIGatewayProxyResult> => {
  const appContext = await initializeApplicationContext(
    applicationContext,
    DeleteAccountByIdModule,
    [dbEnvSecrets]
  );
  const controller = appContext.get(DeleteAccountByIdController);

  return await controller.do(event, context);
};
