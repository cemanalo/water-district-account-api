import { INestApplicationContext } from "@nestjs/common";
import { SecretClientService } from "../services/secret.client.service";
import { NestFactory } from "@nestjs/core";

type Secret = {
    key: string;
    dbEnvMapping: Record<string, string>
}
export const initializeApplicationContext = async (
  applicationContext: INestApplicationContext,
  module: unknown,
  secrets?: Secret[],
): Promise<INestApplicationContext> => {
  if (applicationContext) {
    return applicationContext;
  }

  if(secrets && secrets.length > 0) {
    const secretClient = new SecretClientService()
    const loadSecrets = secrets.map(async ({key, dbEnvMapping}) => {
      const dbCredentials = await secretClient.getValue(key);
      secretClient.mapToEnv(dbCredentials, dbEnvMapping);
    })
    await Promise.all(loadSecrets);
  }

  return await NestFactory.createApplicationContext(module);
};
