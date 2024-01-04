import DashboardBox from "@/components/DashboardBox";
import { useGetHistoricalQuery } from "@/state/api";
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

const CustomYAxisTick = ({ x, y, payload }) => {
  const value = payload.value;
  const padding = 20; // change this to create more space between the axis and the label
  
  // For the left tick, subtract the padding from the x position
  const leftTickX = x - padding - 10;
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







const Row3 = () => {
  const {palette} = useTheme();
  
  const { data, isLoading, error } = useGetHistoricalQuery("aapl");
  // If data is loading, show a loading indicator
  while (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show an error message
  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  const parsedData = data?.dates.map((dateStr, index) => {
  const date = new Date(dateStr);
  const month = date.toLocaleString('default', { month: 'short' });

  return {
    month: month,
    closingPrice: data.closingPrices[index],
    highPrice: data.highPrices[index ],
    lowPrice: data.lowPrices[index],
  };
});

  const allValues = [
    ...parsedData.map(p => p.closingPrice),
    ...parsedData.map(p => p.highPrice),
    ...parsedData.map(p => p.lowPrice),
  ];
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  const scale = scaleLinear().domain([minVal, maxVal]).nice();
  const [newMinVal, newMaxVal] = scale.domain();

 // If data is not available, show nothing or a placeholder
 if (!data) {
   return null;
 }
 

  return (
    <>
    <DashboardBox  gridArea="g"></DashboardBox>


    
    <DashboardBox  gridArea="h">
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <LineChart
            data={parsedData}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="month" tickLine={false} style={{fontSize: "10px"}} domain={[newMinVal, newMaxVal]}/>
            <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{fontSize: "10px"}} domain={[newMinVal, newMaxVal]} tick={CustomYAxisTick}/>
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{fontSize: "10px"}} />
            <Tooltip />
            <Legend height={20} wrapperStyle={{margin: "0 0 10px 0"}} />
            <Line yAxisId="left" type="monotone" dataKey="closingPrice" stroke={palette.tertiary[500]} />
            <Line yAxisId="left" type="monotone" dataKey="highPrice" stroke={palette.primary.main} />
            <Line yAxisId="left" type="monotone" dataKey="lowPrice" stroke={palette.secondary.main} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardBox>
    <DashboardBox  gridArea="i"></DashboardBox>
    <DashboardBox  gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3;