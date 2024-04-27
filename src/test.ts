import { Account } from "./libs/entities/account.entity";
import { validate as classValidator } from "class-validator";

async function test() {
  // const billing = new Billing()
  // billing.fk_account_id = "12345"
  // billing.billing_notice = "Monthly Billing Notice"
  // billing.covered_from = "2023-10-01"
  // billing.covered_to = "2023-10-31"
  // billing.connection_type = "Residential"
  // billing.meter_number = "987654321"
  // billing.previous_reading = 100
  // billing.present_reading = 150
  // billing.consumption = 50
  // billing.current_month_bill = 500
  // billing.arrears = 100
  // billing.total_amount_due = 600
  // billing.due_date = "2023-11-15"


  // const validationErrors = await classValidator(billing)
  // console.log(validationErrors)

  const a = "4"
  // const isNumber = Number.isInteger(Number(a))
  console.log(Number("abcs"))
  // console.log({ isNumber })
}

test().catch(console.error)