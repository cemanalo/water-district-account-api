import { Logger, Module } from "@nestjs/common";
import { PatchAccountController } from "./controller";
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
  providers: [Logger, PatchAccountController, AccountService],
})
export class PatchAccountByIdModule {}
