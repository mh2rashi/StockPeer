/**
 * This is a TypeScript React component that displays a table representing the top shareholders of a
 * stock within a Dashboard page.
 * @returns The Holders component returns a table representing the top share holders of a stock within
 * the Dashboard page. The component takes a 'ticker' property, which is a string representing the
 * stock ticker symbol and is used to fetch data from the API. The component fetches data from the API
 * using the useGetHoldersQuery hook and displays loading animations while the data is being fetched.
 * Once the data is loaded
 **/


// React 
import { useState, useEffect } from 'react';

// Custom color theme
import "../../index.css";
import { useTheme } from '@mui/material/styles';

// Components
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import BoxHeader from "../../components/BoxHeader";
import DashboardBox from "../../components/DashboardBox";

// API
import { useGetHoldersQuery } from "@/state/yahooAPI";
import { GetStockHoldersResponse } from "@/state/types";

// Animations & Icons 
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type Props = {
  ticker: string;
};

const Holders = ({ ticker }: Props) => {

  // Fetch data from API
  const { data, isLoading, error } = useGetHoldersQuery(ticker);

  // Custom theme colors
  const theme = useTheme();

  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(1);

  // Increment key whenever ticker changes to force re-rendering
  useEffect(() => {
    setKey1((prevKey) => prevKey + 1);
    setKey2((prevKey) => prevKey + 1);
  }, [ticker]);

  // Function to get current date formatted as YYYY-MM-DD
  function getCurrentDateFormatted() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
    const day = now.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Loading state
  if (isLoading) {
    return (
      <>
        <DashboardBox gridArea="b" padding="1rem 1rem 1.25rem 1rem" key={key1}>
          <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
        </DashboardBox>
        <DashboardBox gridArea="c" padding="1rem 1rem 1.25rem 1rem" key={key2}>
          <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
        </DashboardBox>
      </>
    );
  }

  // Error or no data state
  if (error || !ticker || !data) {
    return (
      <>
        <DashboardBox gridArea="b" padding="1rem 1rem 1.25rem 1rem" key={key1} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
          <SearchRoundedIcon sx={{ fontSize: "144px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
          <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
        </DashboardBox>
        <DashboardBox gridArea="c" padding="1rem 1rem 1.25rem 1rem" key={key2} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
          <SearchRoundedIcon sx={{ fontSize: "144px", color: theme.palette.grey[300] }}></SearchRoundedIcon>
          <span style={{ color: theme.palette.grey[300] }}>Please enter or re-enter your stock ticker</span>
        </DashboardBox>
      </>
    );
  }

  if (!data) {
    return null;
  }

  // Prepare holders data
  const HoldersCols = [
    {
      field: "holder",
      headerName: "Holders",
      flex: 1,
      headerClassName: 'data-grid-column-header',
    },
    {
      field: "shares",
      headerName: "Shares",
      flex: 0.5,
      headerClassName: 'data-grid-column-header',
    },
    {
      field: "value",
      headerName: "Values",
      flex: 0.5,
      headerClassName: 'data-grid-column-header',
    },
  ];

  // Function to transform data to be used by the Datagrid component
  const transformData = (inputData: GetStockHoldersResponse, key: string) => {
    return inputData[key].Holders.map((holder, index) => ({
      id: index,
      holder, 
      shares: inputData[key].Shares[index],
      value: inputData[key].Value[index],
    }));
  };

  return (
    <>
      <DashboardBox className="custom-scrollbar" gridArea="b" width="100%" height="100%" key={key1}>
        <BoxHeader title="Top Institutional Holders" sideText={getCurrentDateFormatted()} />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          className="custom-scrollbar"
          sx={{
            "& .MuiDataGrid-root": {
              color: theme.palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
              fontSize: '13px',
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            className="custom-scrollbar"
            rows={transformData(data, "Top Institutional Holders")}
            columns={HoldersCols}
            rowHeight={35}
            hideFooter
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="c" width="100%" height="100%" key={key2} className="custom-scrollbar">
        <BoxHeader title="Top Mutual Fund Holders" sideText={getCurrentDateFormatted()} />
        <Box
          className="custom-scrollbar"
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: theme.palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
              fontSize: '13px',
              color: "#fff",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${theme.palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
            // Custom scrollbar styles
            "& .MuiDataGrid-window::-webkit-scrollbar": {
              width: '16px',
            },
            "& .MuiDataGrid-window::-webkit-scrollbar-track": {
              borderRadius: '8px',
              backgroundColor: '#e7e7e7',
              border: '1px solid #cacaca',
            },
            "& .MuiDataGrid-window::-webkit-scrollbar-thumb": {
              borderRadius: '8px',
              border: '3px solid transparent',
              backgroundClip: 'content-box',
              backgroundColor: '#c2c5ce',
            },
          }}
        >
          <DataGrid
            className="custom-scrollbar"
            rows={transformData(data, "Top Mutual Fund Holders")}
            columns={HoldersCols}
            rowHeight={35}
            hideFooter
          />
        </Box>
      </DashboardBox>
    </>
  );
};

export default Holders;
