import { Coda } from "coda-js";
import * as dotenv from "dotenv";
dotenv.config();

const coda = new Coda(process.env.CODA_API_KEY);
const table = await coda.getTable(process.env.CODA_DOCUMENT, process.env.CODA_TABLE);

const getRow = async () => {
  const rows = await table.listRows({
    useColumnNames: true,
  });
  return rows[0];
};

const updateRow = async (row, data) => {
  return await table.updateRow(row.id, data);
};

export { getRow, updateRow };