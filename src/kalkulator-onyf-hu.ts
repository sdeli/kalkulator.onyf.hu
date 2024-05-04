import puppeteer, { Page, Browser } from 'puppeteer';
import { parse } from 'csv-parse';
import * as fs from 'fs';
import { forEach } from 'lodash';
console.log(11);

const FUNNY_SEARCH_CATS_URL = 'https://kalkulator.onyf.hu/kalkulacio.xhtml';
const INPUT_FILE_PATH = 'assets/Sanyónak nyugdíjkalkulátorhoz.csv';

interface CSVRow {
  [key: string]: string;
}

console.log();
(async () => {
  const url: string = 'assets/Sanyónak nyugdíjkalkulátorhoz.csv';

  const browser = await connectToExistingBrowser();
  const page = await browser.newPage();
  page.setViewport({ height: 1000, width: 1000 })
  await page.goto(FUNNY_SEARCH_CATS_URL);
  console.log('wait');
  await page.waitForSelector('[name="homeForm:nyugdijInputTable:0:eves"]');
  console.log('waited');
  console.log('typed');

  fs.readFile(url, function (err, fileData) {
    parse(fileData, { columns: false, trim: true }, async function (err, rows: string[][]) {
      console.log(rows);
      for (let i = 0; i < rows.length; i++) {
        if (i === 0) continue;
        await fillOutRow(page, i - 1, rows[i])
      }
    })

    // Your CSV data is in an array of arrys passed to this callback as rows.
  })

  // fillOutRow(page, 0);
})()

async function fillOutRow(page: Page, rowNum: number, row: string[]) {
  console.log('rowNum: ' + rowNum);

  console.log(row[1]);
  console.log(getCol1Sel(rowNum));
  if (row[1]) {
    await page.$eval(getCol1Sel(rowNum), (input: HTMLInputElement, text: string) => {
      input.value = text;
    }, row[1]);
  }

  console.log(row[2]);
  console.log(getCol2Sel(rowNum));
  if (row[2]) {
    await page.$eval(getCol2Sel(rowNum), (input: HTMLInputElement, text: string) => {
      input.value = text;
    }, row[2]);
  }

  console.log(row[3]);
  console.log(getCol3Sel(rowNum));
  if (row[3]) {
    await page.$eval(getCol3Sel(rowNum), (input: HTMLInputElement, text: string) => {
      input.value = text;
    }, row[3]);
  }

  console.log(row[4]);
  console.log(getCol4Sel(rowNum));
  if (row[4]) {
    await page.$eval(getCol4Sel(rowNum), (input: HTMLInputElement, text: string) => {
      input.value = text;
    }, row[4]);
  }
}

function getCol1Sel(rowNum: number) {
  return `[name="homeForm:nyugdijInputTable:${rowNum}:eves"]`;
}
function getCol2Sel(rowNum: number) {
  return `[name="homeForm:nyugdijInputTable:${rowNum}:jutalom"]`;
}
function getCol3Sel(rowNum: number) {
  return `[name="homeForm:nyugdijInputTable:${rowNum}:adom_jrlkkoteles_jvdlm"]`;
}
function getCol4Sel(rowNum: number) {
  return `[name="homeForm:nyugdijInputTable:${rowNum}:osztonapok"]`;
}

async function connectToExistingBrowser() {
  const browserURL = 'http://127.0.0.1:9222';
  const browser = await puppeteer.connect({ browserURL });
  return browser;
}

// Function to fetch and parse CSV file
async function parseCSV(filePath: string): Promise<CSVRow[] | null> {
  try {
    // Read CSV file
    const text = await fs.promises.readFile(filePath, 'utf-8');

    // Parse CSV data
    const data = await new Promise<CSVRow[]>((resolve, reject) => {
      csvParse(text, {
        delimiter: ',', // Customize delimiter if needed
        trim: true, // Trim whitespace
        columns: true // Treat first row as headers
      }, (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      });
    });

    return data;
  } catch (error) {
    console.error('Error parsing CSV:', error);
    return null;
  }
}
