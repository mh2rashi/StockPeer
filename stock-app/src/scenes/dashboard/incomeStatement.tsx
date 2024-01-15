import DashboardBox from "@/components/DashboardBox";
import { useGetIncomeStatementQuery } from "@/state/yahooAPI";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
} from 'recharts';
import BoxHeader from "@/components/BoxHeader";
import "../../index.css";
     


type Props = {
  searchQuery: string;
}

const IncomeStatement = ({ searchQuery } : Props) => {
  
  const { data, isLoading, error } = useGetIncomeStatementQuery(searchQuery);
  
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

    const dataObj = [];

    for (let i = 1; i < data[0].length; i++) {

        const dataPoint = {
        name : data[0][i],
        pv : parseInt(data[1][i].replace(/,/g, ''), 10),
        uv: parseInt(data[2][i].replace(/,/g, ''), 10),
        amt: parseInt(data[3][i].replace(/,/g, ''), 10),
        }

        dataObj.push(dataPoint)
    }    
    dataObj.reverse();
  return (
    <>

    <DashboardBox  gridArea="f" className="dashboard-box">
      <BoxHeader
              title="Financials: Revenue & Earnings"
              subtitle="Visual representation of revenue and earnings over time"
              sideText=""
            />
          <div style={{width: "100%", height: "100%"}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={dataObj}
                margin={{
                  top: 20,
                  right: 20,
                  left: 15,
                  bottom: 55,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" allowDataOverflow={true} style={{fontSize:"10px"}}/>
                <YAxis tickFormatter={(value) => value.toLocaleString()} style={{fontSize: "10px"}} />
                <Tooltip
                  formatter={(value, name) =>{
                    return [value.toLocaleString(), name];
                  }}
                />
                <Legend height={20} wrapperStyle={{margin: "0 0 10px 0"}} />
                <Bar dataKey="pv" name="Revenue" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                <Bar dataKey="uv" name="Earnings" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>

    </DashboardBox>
    </>
  )
}

export default IncomeStatement;