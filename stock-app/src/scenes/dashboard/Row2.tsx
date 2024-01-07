import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from '@mui/material/styles';
import BoxHeader from "../../components/BoxHeader" // Replace with actual path to BoxHeader component
import DashboardBox from "../../components/DashboardBox"; // Replace with actual path to DashboardBox component
import { useGetHoldersQuery } from "@/state/yahooAPI";
import "../../index.css"

type Props = {
  searchQuery: string;
}

const Row2 = ({ searchQuery } : Props) => {

  const {palette} = useTheme();
 
  const { data, isLoading, error } = useGetHoldersQuery(searchQuery);
      
  while (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show an error message
  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  // If data is not available, show nothing or a placeholder
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


  const transformData = (inputData, key) => {
    return inputData[key].Holders.map((holder, index) => ({
      id: index,
      holder,
      shares: inputData[key].Shares[index],
      value: inputData[key].Value[index],
    }));
  };

  return (
    <>
    
      <DashboardBox gridArea="b" >
          <BoxHeader title="Top Institutional Holders"/>
          <Box
            mt="0.5rem"
            p="0 0.5rem"
            height="75%"
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
                rows={transformData(data, "Top Institutional Holders")} // Assuming `data` is the correct variable
                columns={HoldersCols}
                rowHeight={35}
                hideFooter
              />
          </Box>
        </DashboardBox>
        
        <DashboardBox gridArea="c" >
          <BoxHeader title="Top Mutual Fund Holders" />
          <Box
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

export default Row2;