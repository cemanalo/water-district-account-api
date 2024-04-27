import { Logger, Module } from "@nestjs/common";
import dbConfig from "../../configs/db-config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { CreateAccountUseCase } from "./create.account.usecase";
import { CreateAccountController } from "./create.account.controller";
import { AccountService } from "../../services/account.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
  ],
  providers: [
    Logger,
    CreateAccountController,
    CreateAccountUseCase,
    AccountService,
  ],
})
export class PostAccountsModule {}
