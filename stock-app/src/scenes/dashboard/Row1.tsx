// import BoxHeader from "@/components/BoxHeader";
import DashboardBox from "@/components/DashboardBox"
import { useGetProfileQuery } from "@/state/api"
import { Typography } from "@mui/material";
// import { ResponsiveContainer, BarChart, Bar, LineChart, Legend, AreaChart, XAxis, YAxis, Tooltip, Area, Line, CartesianGrid } from "recharts";
import googleLogo from "../../assets/google.webp"
import "../../index.css"

const Row1 = () => {

  const { data, isLoading, error } = useGetProfileQuery("googl");
   // If data is loading, show a loading indicator
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

   return (
     
     <>

     <DashboardBox  gridArea="a" padding="1rem 1rem 1.25rem 1rem">

        <div style={{height: "55%", display:"flex" }}>

          <div id='logo' style={{width: "40%", backgroundColor:"transparent", padding:"0.5rem"}}>
            <img src={googleLogo} style={{ width:"100%", height:"100%", borderRadius: "50%"}}/>
          </div>

          <div id='namePrice' style={{width: "60%", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            
            <Typography variant="h1" style={{fontSize: "2.5rem"}}>{data['Closing Price'].split(" At")[0]}</Typography>
            <Typography variant="h1" style={{marginTop:"1rem"}}>{data['Name']}</Typography>


            <div style={{width: "100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"2rem 0rem 1rem 0rem"}}>

                <Typography variant="h1" style={{fontSize: "1rem"}}>
                  <span style={{fontWeight: "bold"}}>Telephone: </span>{data['Telephone']}
                </Typography>

                <Typography variant="h1" style={{ fontSize: "1rem" }}>
                  <span style={{ fontWeight: "bold" }}>Website: </span>
                  <a href={data['Website']} target="_blank" rel="noopener noreferrer">
                    {data['Website']}
                  </a>
                </Typography>
        
            </div>

          </div>
          
          
        </div>



        <hr style={{marginTop: "0rem"}}/>


        <div className="custom-scrollbar" style={{height: "45%", display:"flex", overflow:"auto"}}>
          <p style={{ fontSize:"1rem", display: "inline", fontWeight: "normal", paddingBottom: "1rem", marginTop:"0rem"}}><span style={{fontSize: "1rem",fontWeight: "bold"}}>Summary: </span>{data['Summary']}</p>

        </div>

     </DashboardBox>
     
     <DashboardBox gridArea="d"></DashboardBox>
     <DashboardBox  gridArea="e"></DashboardBox>
     <DashboardBox  gridArea="f"></DashboardBox>

     </>
   );
};

export default Row1;