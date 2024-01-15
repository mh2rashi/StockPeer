import DashboardBox from "@/components/DashboardBox";
import { useGetHistoricalQuery } from "@/state/yahooAPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Text,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import {scaleLinear} from 'd3-scale';
import BoxHeader from "@/components/BoxHeader";
import {useState, useEffect} from 'react';
import loadingAnimation from '../../assets/LoadingAnimation.json'; // Replace with the path to your animation JSON file
import Lottie from 'lottie-react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';



const CustomYAxisTick = ({ x, y, payload }) => {
  const value = payload.value;
  const padding = 20; // change this to create more space between the axis and the label
  
  // For the left tick, subtract the padding from the x position
  const leftTickX = x - padding;
  const originalTick = (
    <Text x={leftTickX} y={y} verticalAnchor="middle" textAnchor="start" fontSize={10}>
      {value}
    </Text>
  );
  
  // Calculate tick position for the right side
  const rightTickX = x + 1140 + padding; // Adjust depending on your layout
  
  const rightTick = (
    <Text x={rightTickX} y={y} verticalAnchor="middle" textAnchor="end" fontSize={10}>
      {value}
    </Text>
  );

  // Return Group containing both ticks
  return <g>{originalTick}{rightTick}</g>
};



type Props = {
  searchQuery: string;
}

const PriceGraph = ({ searchQuery } : Props) => {
  const {palette} = useTheme();
  
  const { data, isLoading, error } = useGetHistoricalQuery(searchQuery);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [searchQuery]);

  if (isLoading) {
    return (
      <DashboardBox gridArea="h" padding="1rem 1rem 1.25rem 1rem" key={key}>
        <Lottie animationData={loadingAnimation} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} />
      </DashboardBox>
    );
  }

  if (error || !searchQuery || !data) {
    return (
      <DashboardBox gridArea="h" padding="1rem 1rem 1.25rem 1rem" key={key} display="flex" flexDirection="column" alignItems="center" justifyContent='center'>
            <SearchRoundedIcon sx={{ fontSize: "344px" }}></SearchRoundedIcon>
            <span>Please enter or re-enter your stock ticker</span>
      </DashboardBox>
    );
  }

  if (!data) {
    return null;
  }
  
  const parsedData = data?.dates.reduce((result, dateStr, index) => {
  const date = new Date(dateStr);
  if (!isNaN(date)) {
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate(); // Get the day from the date

    const closingPrice = parseFloat(data.closingPrices[index]);
    const highPrice = parseFloat(data.highPrices[index]);
    const lowPrice = parseFloat(data.lowPrices[index]);

    result.push({
      month: `${month} ${day}`, // Combine month and day
      closingPrice: closingPrice,
      highPrice: highPrice,
      lowPrice: lowPrice,
    });
  }
  return result;
}, []).reverse();

  
  const allValues = [
    ...parsedData.map(p => p.closingPrice),
    ...parsedData.map(p => p.highPrice),
    ...parsedData.map(p => p.lowPrice),
  ];

  const minVal = Math.min(...allValues.filter(val => !isNaN(val)));
  const maxVal = Math.max(...allValues.filter(val => !isNaN(val)));

  const scale = scaleLinear().domain([minVal, maxVal]).nice();
  const [newMinVal, newMaxVal] = scale.domain();



 
  return (
    <>
    <DashboardBox  gridArea="h">
      <BoxHeader
        title="Market Trends: Analyzing Price Movements"
        subtitle="High, Closing, and Low prices over time"
        sideText=""
      />
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <LineChart
            data={parsedData}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
            <XAxis dataKey="month" tickLine={false} style={{fontSize: "10px"}} domain={[newMinVal, newMaxVal]} interval={Math.ceil(parsedData.length / 10)}/>
            <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{fontSize: "10px"}} domain={[newMinVal - 10, newMaxVal + 10]} tick={CustomYAxisTick}/>
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize: "10px"}}  domain={[newMinVal - 10, newMaxVal + 10]} />
            <Tooltip />
            <Legend height={20} wrapperStyle={{margin: "0 0 10px 0"}} />
            <Line yAxisId="left" type="monotone" dataKey="closingPrice" stroke={palette.tertiary[500]} name="Closing Price" />
            <Line yAxisId="left" type="monotone" dataKey="highPrice" stroke={palette.primary.main} name="High Price"/>
            <Line yAxisId="left" type="monotone" dataKey="lowPrice" stroke={palette.secondary.main} name="Low Price" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>

    </>
  )
}

export default PriceGraph;