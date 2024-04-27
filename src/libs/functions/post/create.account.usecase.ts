import { Injectable } from "@nestjs/common";
import { UseCase } from "../../commons/usecase";
import { Account } from "../../entities/account.entity";
import { AccountService } from "../../services/account.service";

type Input = Account
type Output = {
  id: number
}

@Injectable()
export class CreateAccountUseCase extends UseCase<Input, Promise<Output>> {
  constructor(private accountService: AccountService) {
    super()
  }

  async execute(input: Input): Promise<Output> {
    const { id } = await this.accountService.create(input)
    return { id }
  }
}