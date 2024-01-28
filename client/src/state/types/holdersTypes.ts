export interface Institutional {
    Holders: string[];
    Shares: string[];
    Value: string[];
}

export interface GetStockHoldersResponse {
    "Top Institutional Holders": Institutional;
    "Top Mutual Fund Holders": Institutional;
}
