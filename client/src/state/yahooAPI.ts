/* The code you provided is creating an API using Redux Toolkit's `createApi` function. This API is
used to make various stock data queries. */

// Import necessary functions and types from Redux Toolkit and other files
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    GetStockBalanceSheetResponse,
    GetStockStatisticsResponse,
    GetStockProfileResponse,
    GetStockHoldersResponse,
    GetStockHistoricalResponse,
    GetStockIncomeStatementResponse,
    GetStockSustainabilityResponse
} from "./types";

// Create stock API using Redux Toolkit's createApi function
export const stockApi = createApi({
    // Set base URL for API requests using environment variable
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    // Set the reducer path for this API
    reducerPath: "stockApi",
    // Define tag types for caching
    tagTypes: [
        "StockStatistics",
        "StockProfile",
        "StockHolders",
        "StockHistorical",
        "StockBalanceSheet",
        "StockIncomeStatement",
        "StockSustainability"
    ],
    // Define endpoints for various stock data queries
    endpoints: (build) => ({
        // Query to get stock statistics
        getStockStatistics: build.query<GetStockStatisticsResponse, string>({
            query: (ticker) => `api/statistics/${ticker}`,
            providesTags: ["StockStatistics"] // Tag for caching
        }),
        // Query to get stock profile
        getProfile: build.query<GetStockProfileResponse, string>({
            query: (ticker) => `api/profile/${ticker}`,
            providesTags: ["StockProfile"] // Tag for caching
        }),
        // Query to get stock holders
        getHolders: build.query<GetStockHoldersResponse, string>({
            query: (ticker) => `api/holders/${ticker}`,
            providesTags: ["StockHolders"] // Tag for caching
        }),
        // Query to get stock historical data
        getHistorical: build.query<GetStockHistoricalResponse, string>({
            query: (ticker) => `api/historical/${ticker}`,
            providesTags: ["StockHistorical"] // Tag for caching
        }),
        // Query to get stock balance sheet
        getBalanceSheet: build.query<GetStockBalanceSheetResponse, string>({
            query: (ticker) => `api/balanceSheet/${ticker}`,
            providesTags: ["StockBalanceSheet"] // Tag for caching
        }),
        // Query to get stock income statement
        getIncomeStatement: build.query<GetStockIncomeStatementResponse, string>({
            query: (ticker) => `api/incomeStatement/${ticker}`,
            providesTags: ["StockIncomeStatement"] // Tag for caching
        }),
        // Query to get stock sustainability data
        getSustainability: build.query<GetStockSustainabilityResponse, string>({
            query: (ticker) => `api/sustainability/${ticker}`,
            providesTags: ["StockSustainability"] // Tag for caching
        }),
    })
});

// Extract hooks for each query to be used in components
export const {
    useGetStockStatisticsQuery,
    useGetProfileQuery, 
    useGetHoldersQuery,
    useGetHistoricalQuery,
    useGetBalanceSheetQuery,
    useGetIncomeStatementQuery,
    useGetSustainabilityQuery
} = stockApi;
