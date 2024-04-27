import {
  IsDateString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "accounts",
})
export class Account {
  @PrimaryGeneratedColumn()
  @IsOptional()
  @IsNumber()
  id: number;

  @Column()
  @IsNumberString()
  account_id: string;

  @Column()
  @IsString()
  first_name: string;

  @Column()
  @IsString()
  last_name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsOptional()
  @IsDateString()
  created_at: string;

  @Column()
  @IsOptional()
  @IsDateString()
  updated_at: string;
}
