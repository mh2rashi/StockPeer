import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetStockStatisticsResponse } from "./types/statisticsTypes";
import { GetStockProfileResponse } from "./types/profileTypes";
import { GetStockHoldersResponse } from "./types/holdersTypes";
import { GetStockHistoricalResponse } from "./types/historicalTypes";
import { GetStockBalanceSheetResponse } from "./types/balanceSheetTypes";
import { GetStockIncomeStatementResponse } from "./types/incomeStatementTypes";
import { GetStockSustainabilityResponse } from "./types/sustainabilityTypes";

export const stockApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
    reducerPath: "stockApi",
    tagTypes: ["StockStatistics", "StockProfile", "StockHolders", "StockHistorical", "StockBalanceSheet", "StockIncomeStatement", "StockSustainability"],
    endpoints: (build) => ({
        getStockStatistics: build.query<GetStockStatisticsResponse, string>({
            query: (ticker) => `api/statistics/${ticker}`,
            providesTags: ["StockStatistics"]
        }),
        getProfile: build.query<GetStockProfileResponse, string>({
            query: (ticker) => `api/profile/${ticker}`,
            providesTags: ["StockProfile"]
        }),
        getHolders: build.query<GetStockHoldersResponse, string>({
            query: (ticker) => `api/holders/${ticker}`,
            providesTags: ["StockHolders"]
        }),
        getHistorical: build.query<GetStockHistoricalResponse, string>({
            query: (ticker) => `api/historical/${ticker}`,
            providesTags: ["StockHistorical"]
        }),
        getBalanceSheet: build.query<GetStockBalanceSheetResponse, string>({
            query: (ticker) => `api/balanceSheet/${ticker}`,
            providesTags: ["StockBalanceSheet"]
        }),
        getIncomeStatement: build.query<GetStockIncomeStatementResponse, string>({
            query: (ticker) => `api/incomeStatement/${ticker}`,
            providesTags: ["StockIncomeStatement"]
        }),
        getSustainability: build.query<GetStockSustainabilityResponse, string>({
            query: (ticker) => `api/sustainability/${ticker}`,
            providesTags: ["StockSustainability"]
        }),
        // ... other endpoints ... 
    })
});

export const { useGetStockStatisticsQuery, useGetProfileQuery, 
    useGetHoldersQuery, useGetHistoricalQuery, useGetBalanceSheetQuery,
    useGetIncomeStatementQuery, useGetSustainabilityQuery } = stockApi;



