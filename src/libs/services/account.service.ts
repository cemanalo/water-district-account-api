import { Injectable } from "@nestjs/common";
import { Account } from "../entities/account.entity";
import { DataSource, DeleteResult, Repository, UpdateResult } from "typeorm";

@Injectable()
export class AccountService {
  private accountRepository: Repository<Account>;

  constructor(private dataSource: DataSource) {
    this.accountRepository = this.dataSource.getRepository(Account);
  }

  async create(Account: Account): Promise<Account> {
    return this.accountRepository.save(Account);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findOneById(id: number): Promise<Account> {
    return this.accountRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.accountRepository.delete(id);
  }

  async findByAccountId(accountId: string): Promise<Account[]> {
    return this.accountRepository.findBy({ account_id: accountId });
  }

  async patchById(id: number, account: Account): Promise<UpdateResult> {
    return this.accountRepository.update({ id }, account );
  }
}
