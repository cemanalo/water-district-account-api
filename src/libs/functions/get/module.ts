import { Logger, Module } from "@nestjs/common";
import { GetAccountsController } from "./controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountService } from "../../services/account.service";
import dbConfig from "../../configs/db-config";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
  ],
  providers: [Logger, GetAccountsController, AccountService],
})
export class GetAccountsModule {}
