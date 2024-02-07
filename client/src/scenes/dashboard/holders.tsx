import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import BoxHeader from "../../components/BoxHeader" // Replace with actual path to BoxHeader component
import DashboardBox from "../../components/DashboardBox"; // Replace with actual path to DashboardBox component
import { useGetHoldersQuery } from "@/state/yahooAPI";
import "../../index.css"
import {useState, useEffect} from 'react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { GetStockHoldersResponse } from "@/state/types/holdersTypes";

function getCurrentDateFormatted() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, add 1 to get correct month
  const day = now.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

type Props = {
  ticker: string;
};


const Holders = ({ ticker }: Props) => {

  const {palette} = useTheme();
  const theme = useTheme();
  const { data, isLoading, error } = useGetHoldersQuery(ticker);
  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(1);

    useEffect(() => {
      setKey1((prevKey) => prevKey + 1);
      setKey2((prevKey) => prevKey + 1);
    }, [ticker]);

    // ...

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
    <BoxHeader title="Top Institutional Holders" sideText= {getCurrentDateFormatted()} /> 
          <Box
            mt="0.5rem"
            p="0 0.5rem"
            height="75%"
            className="custom-scrollbar"
            sx={{
              "& .MuiDataGrid-root": {
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`, fontSize: '13px', color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden",
              },
              
            }}
          >
              <DataGrid
                className="custom-scrollbar"
                rows={transformData(data, "Top Institutional Holders")} // Assuming `data` is the correct variable
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
                color: palette.grey[300],
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
                fontSize: '13px',
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: `1px solid ${palette.grey[800]} !important`,
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
              rows={transformData(data, "Top Mutual Fund Holders")} // Assuming `data` is the correct variable
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
