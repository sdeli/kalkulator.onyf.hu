"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const csv_parse_1 = require("csv-parse");
const fs = __importStar(require("fs"));
console.log(11);
const FUNNY_SEARCH_CATS_URL = 'https://kalkulator.onyf.hu/kalkulacio.xhtml';
const INPUT_FILE_PATH = 'assets/Sanyónak nyugdíjkalkulátorhoz.csv';
console.log();
(async () => {
    const url = 'assets/Sanyónak nyugdíjkalkulátorhoz.csv';
    const browser = await connectToExistingBrowser();
    const page = await browser.newPage();
    page.setViewport({ height: 1000, width: 1000 });
    await page.goto(FUNNY_SEARCH_CATS_URL);
    console.log('wait');
    await page.waitForSelector('[name="homeForm:nyugdijInputTable:0:eves"]');
    console.log('waited');
    console.log('typed');
    fs.readFile(url, function (err, fileData) {
        (0, csv_parse_1.parse)(fileData, { columns: false, trim: true }, async function (err, rows) {
            console.log(rows);
            for (let i = 0; i < rows.length; i++) {
                if (i === 0)
                    continue;
                await fillOutRow(page, i - 1, rows[i]);
            }
        });
        // Your CSV data is in an array of arrys passed to this callback as rows.
    });
    // fillOutRow(page, 0);
})();
async function fillOutRow(page, rowNum, row) {
    console.log('rowNum: ' + rowNum);
    console.log(row[1]);
    console.log(getCol1Sel(rowNum));
    if (row[1]) {
        await page.$eval(getCol1Sel(rowNum), (input, text) => {
            input.value = text;
        }, row[1]);
    }
    console.log(row[2]);
    console.log(getCol2Sel(rowNum));
    if (row[2]) {
        await page.$eval(getCol2Sel(rowNum), (input, text) => {
            input.value = text;
        }, row[2]);
    }
    console.log(row[3]);
    console.log(getCol3Sel(rowNum));
    if (row[3]) {
        await page.$eval(getCol3Sel(rowNum), (input, text) => {
            input.value = text;
        }, row[3]);
    }
    console.log(row[4]);
    console.log(getCol4Sel(rowNum));
    if (row[4]) {
        await page.$eval(getCol4Sel(rowNum), (input, text) => {
            input.value = text;
        }, row[4]);
    }
}
function getCol1Sel(rowNum) {
    return `[name="homeForm:nyugdijInputTable:${rowNum}:eves"]`;
}
function getCol2Sel(rowNum) {
    return `[name="homeForm:nyugdijInputTable:${rowNum}:jutalom"]`;
}
function getCol3Sel(rowNum) {
    return `[name="homeForm:nyugdijInputTable:${rowNum}:adom_jrlkkoteles_jvdlm"]`;
}
function getCol4Sel(rowNum) {
    return `[name="homeForm:nyugdijInputTable:${rowNum}:osztonapok"]`;
}
async function connectToExistingBrowser() {
    const browserURL = 'http://127.0.0.1:9222';
    const browser = await puppeteer_1.default.connect({ browserURL });
    return browser;
}
// Function to fetch and parse CSV file
async function parseCSV(filePath) {
    try {
        // Read CSV file
        const text = await fs.promises.readFile(filePath, 'utf-8');
        // Parse CSV data
        const data = await new Promise((resolve, reject) => {
            csvParse(text, {
                delimiter: ',',
                trim: true,
                columns: true // Treat first row as headers
            }, (err, output) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(output);
                }
            });
        });
        return data;
    }
    catch (error) {
        console.error('Error parsing CSV:', error);
        return null;
    }
}
//# sourceMappingURL=kalkulator-onyf-hu.js.map