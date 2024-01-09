import axios from "axios";
import * as cheerio from "cheerio";

async function balanceSheetData(ticker) {
  
    try {
        const url = `https://ca.finance.yahoo.com/quote/${ticker}/balance-sheet?p=${ticker}`;
        const { data } = await axios.get(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
          }
        });
    
        const $ = cheerio.load(data);
        const OutputLst = [];
        const currentLst1 = [];
        const currentLst2 = [];
        const currentLst3 = [];
        const currentLst4 = [];
        const currentLst5 = [];
        const currentLst6 = [];
        const currentLst7 = [];
        const currentLst8 = [];
        const currentLst9 = [];
    
          $('div.D\\(tbhg\\)').eq(0).find('span').each(function() {
            currentLst9.push($(this).text());
          });
        
          $('div[data-test="fin-row"] span:contains("Total Current Assets")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst1.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total non-current assets")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst2.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total Assets")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst3.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total Current Liabilities")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst4.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total non-current liabilities")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst5.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total Liabilities")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst6.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total stockholders\' equity")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst7.push($(this).text());
          });
    
          $('div[data-test="fin-row"] span:contains("Total liabilities and stockholders\' equity")')
          .parent()
          .parent()
          .parent()
          .find('span').each(function() {
            currentLst8.push($(this).text());
          });
    
        return {currentLst9, currentLst1, currentLst2, currentLst3,currentLst4, currentLst5, currentLst6, currentLst7, currentLst8};
    
    } catch (error) {
        throw new Error(`Error fetching data for ticker ${ticker}: ${error.message}`);
    }

    };

export default balanceSheetData;