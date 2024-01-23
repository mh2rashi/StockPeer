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
import {useState, useEffect} from 'react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';


type Props = {
  ticker: string;
}

const IncomeStatement = ({ ticker } : Props) => {
  
  const { data, isLoading, error } = useGetIncomeStatementQuery(ticker);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [ticker]);
  
  if (isLoading) {
    return (
      <DashboardBox gridArea="f" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error || !ticker || !data) {
    return (
      <DashboardBox gridArea="f" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
            <SearchRoundedIcon sx={{ fontSize: "244px" }}></SearchRoundedIcon>
            <span>Please enter or re-enter your stock ticker</span>
      </DashboardBox>

    );
  }

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

    <DashboardBox  gridArea="f" className="dashboard-box" key={key}>
      <BoxHeader
              title="Financials: Revenue & Earnings"
              subtitle="All figures are exact"
              sideText="Trailing Twelve Months (ttm)"
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


