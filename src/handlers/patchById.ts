import { INestApplicationContext } from "@nestjs/common";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { dbEnvSecrets } from "../libs/configs/db-config";
import { initializeApplicationContext } from "../libs/utils/application.context";
import { GetAccountByIdModule } from "../libs/functions/getById/module";
import { GetAccountByIdController } from "../libs/functions/getById/controller";
import { PatchAccountByIdModule } from "../libs/functions/patchById/module";
import { PatchAccountController } from "../libs/functions/patchById/controller";

let applicationContext: INestApplicationContext = null;

export const handler: Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> = async (event, context): Promise<APIGatewayProxyResult> => {
  const appContext = await initializeApplicationContext(
    applicationContext,
    PatchAccountByIdModule,
    [dbEnvSecrets]
  );
  const controller = appContext.get(PatchAccountController);

  return await controller.do(event, context);
};
