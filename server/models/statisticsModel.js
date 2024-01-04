import mongoose from "mongoose";

const Schema = mongoose.Schema;

const valuationMeasuresSchema = new Schema({
  'Market Cap (intraday)': String,
  'Enterprise Value': String,
  'Trailing P/E': String, 
  'Forward P/E': String,
  'PEG Ratio (5 yr expected)': String,
  'Price/Sales (ttm)': String,
  'Price/Book (mrq)': String,
  'Enterprise Value/Revenue': String,
  'Enterprise Value/EBITDA': String,
});

const incomeStatementSchema = new Schema({
  'Revenue (ttm)': String,
  'Revenue Per Share (ttm)': String,
  'Quarterly Revenue Growth (yoy)': String,
  'Gross Profit (ttm)': String,
  EBITDA: String,
  'Net Income Avi to Common (ttm)': String,
  'Diluted EPS (ttm)': String,
  'Quarterly Earnings Growth (yoy)': String,
});

const balanceSheetSchema = new Schema({
  'Total Cash (mrq)': String,
  'Total Cash Per Share (mrq)': String,
  'Total Debt (mrq)': String,
  'Total Debt/Equity (mrq)': String,
  'Current Ratio (mrq)': String,
  'Book Value Per Share (mrq)': String,
});

const cfStatementSchema = new Schema({
  'Operating Cash Flow (ttm)': String,
  'Levered Free Cash Flow (ttm)': String,
});

const StatisticsSchema = new Schema({
  valuationMeasures: valuationMeasuresSchema,
  incomeStatement: incomeStatementSchema,
  balanceSheet: balanceSheetSchema,
  cfStatement: cfStatementSchema,
}, { toJSON: { getters: true } });

const StatisticsModel = mongoose.model("Statistics", StatisticsSchema);

export default StatisticsModel;
