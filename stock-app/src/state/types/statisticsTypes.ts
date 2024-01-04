export interface ValuationMeasures {
  'Market Cap (intraday)': string;
  'Enterprise Value': string;
  'Trailing P/E': string;
  'Forward P/E': string;
  'PEG Ratio (5 yr expected)': string;
  'Price/Sales (ttm)': string;
  'Price/Book (mrq)': string;
  'Enterprise Value/Revenue': string;
  'Enterprise Value/EBITDA': string;
}

export interface IncomeStatement {
  'Revenue (ttm)': string;
  'Revenue Per Share (ttm)': string;
  'Quarterly Revenue Growth (yoy)': string;
  'Gross Profit (ttm)': string;
  EBITDA: string;
  'Net Income Avi to Common (ttm)': string;
  'Diluted EPS (ttm)': string;
  'Quarterly Earnings Growth (yoy)': string;
}

export interface BalanceSheet {
  'Total Cash (mrq)': string;
  'Total Cash Per Share (mrq)': string;
  'Total Debt (mrq)': string;
  'Total Debt/Equity (mrq)': string;
  'Current Ratio (mrq)': string;
  'Book Value Per Share (mrq)': string;
}

export interface CfStatement {
  'Operating Cash Flow (ttm)': string;
  'Levered Free Cash Flow (ttm)': string;
}

export interface GetStockStatisticsResponse {
  tickerSymbol: string;
  valuationMeasures: ValuationMeasures;
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
  cfStatement: CfStatement;
}

