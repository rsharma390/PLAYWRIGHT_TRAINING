import { readFile, utils } from 'xlsx';
import { readFileSync } from 'fs';
import { join } from 'path';
//const assert = require('assert')
import { parse } from 'csv-parse/sync';

export class CommonFunction {

  async ReadExcelFile(filename, sheetname) 
  {
    var workbook = readFile(filename);
    var sheet_name_list = workbook.SheetNames;
    var records = utils.sheet_to_json(workbook.Sheets[sheet_name_list[sheetname]]);
    return records;
  }

  async ReadCSVFile(filename, path) 
  {
    const records = parse(readFileSync(join(path, filename)), {
    columns: true,
    skip_empty_lines: true
    });
  }
}