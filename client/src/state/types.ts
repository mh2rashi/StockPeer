/*
 The code snippet defines a set of TypeScript interfaces that represent the response data structures
 for retrieving various types of stock-related information. Each interface defines the structure and
 types of the data returned by the corresponding API endpoint.
*/


// Interface representing the response for retrieving balance sheet data
export interface GetStockBalanceSheetResponse {
  // Lists representing current liabilities for different periods
  currentLst9: string[];
  currentLst1: string[];
  currentLst2: string[];
  currentLst3: string[];
  currentLst4: string[];
  currentLst5: string[];
  currentLst6: string[];
  currentLst7: string[];
  currentLst8: string[];
}

// Interface representing the response for retrieving historical stock data
export interface GetStockHistoricalResponse {
  // Lists of dates, high prices, low prices, and closing prices
  dates: string[];
  highPrices: string[];
  lowPrices: string[];
  closingPrices: string[];
}

// Interface representing institutional holders data
export interface Institutional {
  Holders: string[];
  Shares: string[];
  Value: string[];
}

// Interface representing the response for retrieving stock holders data
export interface GetStockHoldersResponse {
  // Top institutional holders and top mutual fund holders
  "Top Institutional Holders": Institutional;
  "Top Mutual Fund Holders": Institutional;
}

// Interface representing the response for retrieving income statement data
export interface GetStockIncomeStatementResponse {
  // Breakdown, total revenue, net income, and total expenses
  Breakdown: string[];
  "Total Revenue": string[];
  "Net Income Common Stockholders": string[];
  "Total Expenses": string[];
}

// Interface representing the response for retrieving stock profile data
export interface GetStockProfileResponse {
  // Profile details such as name, closing price, address, etc.
  "Name": string,
  "Closing Price": string,
  "Address": string,
  "Telephone": string,
  "Website": string,
  "Summary": string,
  "Sector(s)": string,
  "Industry": string,
  "Employees": string
}

// Interface representing valuation measures
export interface ValuationMeasures {
  // Various valuation measures such as market cap, P/E ratio, etc.
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

// Interface representing income statement data
export interface IncomeStatement {
  // Income statement details such as revenue, EPS, earnings growth, etc.
  'Revenue (ttm)': string;
  'Revenue Per Share (ttm)': string;
  'Quarterly Revenue Growth (yoy)': string;
  'Gross Profit (ttm)': string;
  EBITDA: string;
  'Net Income Avi to Common (ttm)': string;
  'Diluted EPS (ttm)': string;
  'Quarterly Earnings Growth (yoy)': string;
}

// Interface representing balance sheet data
export interface BalanceSheet {
  // Balance sheet details such as total cash, total debt, current ratio, etc.
  'Total Cash (mrq)': string;
  'Total Cash Per Share (mrq)': string;
  'Total Debt (mrq)': string;
  'Total Debt/Equity (mrq)': string;
  'Current Ratio (mrq)': string;
  'Book Value Per Share (mrq)': string;
}

// Interface representing cash flow statement data
export interface CfStatement {
  // Cash flow statement details such as operating cash flow, free cash flow, etc.
  'Operating Cash Flow (ttm)': string;
  'Levered Free Cash Flow (ttm)': string;
}

// Interface representing statistics related to the stock
export interface GetStockStatisticsResponse {
  // Ticker symbol and various statistics such as valuation measures, income statement, etc.
  tickerSymbol: string;
  valuationMeasures: ValuationMeasures;
  incomeStatement: IncomeStatement;
  balanceSheet: BalanceSheet;
  cfStatement: CfStatement;
}

// Interface representing sustainability-related data for the stock
export interface GetStockSustainabilityResponse {
  // ESG scores, environment score, social score, governance scores, and controversy level
  ESGScores: string[];
  EnvironmentScore: string[];
  SocialScore: string[];
  GovernanceScores: string[];
  ControversyLevel: string[];
}
