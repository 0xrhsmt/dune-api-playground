import { QueryParameter, DuneClient } from "@cowprotocol/ts-dune-client";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config()

const { DUNE_API_KEY } = process.env;

const client = new DuneClient(DUNE_API_KEY ?? "");
const queryID = 1215383;
const parameters = [
  QueryParameter.text("TextField", "Plain Text"),
  QueryParameter.number("NumberField", 3.1415926535),
  QueryParameter.date("DateField", "2022-05-04 00:00:00"),
  QueryParameter.enum("ListField", "Option 1"),
];

const t0 = performance.now();
client
  .refresh(queryID, parameters)
  .then((executionResult) => {
    console.log(executionResult.result?.rows)
    const t1 = performance.now();
    console.log('dune query took %f ms', (t1 - t0));
  });

