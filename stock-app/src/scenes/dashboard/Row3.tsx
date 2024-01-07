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
  BarChart,
  Bar,
  Rectangle,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import {scaleLinear} from 'd3-scale';
import BoxHeader from "@/components/BoxHeader";
     






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

/*const CustomXAxisTick = ({ x, y, payload, data }) => {
  const value = payload.value;
  const index = payload.index;

  const monthMap = {}; // Store dates for each month

  // Loop through the data to populate the monthMap
  data.forEach((item) => {
    const [month, day] = item.split(' ');
    if (!monthMap[month]) {
      monthMap[month] = [];
    }
    monthMap[month].push(day);
  });

  let displayedValue = '';
  const month = value.split(' ')[0];
  const datesForMonth = monthMap[month];

  if (index === 0 || datesForMonth.includes(value.split(' ')[1])) {
    displayedValue = value.split(' ')[1]; // Extracting the day from the value
  }

  return (
    <Text x={x} y={y} dy={16} textAnchor="middle" fontSize={10}>
      {displayedValue}
    </Text>
  );
};*/


type Props = {
  searchQuery: string;
}

const Row3 = ({ searchQuery } : Props) => {
  const {palette} = useTheme();
  
  const { data, isLoading, error } = useGetHistoricalQuery("MSFT");
  // If data is loading, show a loading indicator
  while (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error, show an error message
  if (error) {
    return <div>Error: {error.toString()}</div>;
  }
  
  const parsedData = data?.dates.reduce((result, dateStr, index) => {
    const date = new Date(dateStr);
    if(!isNaN(date)){
      const month = date.toLocaleString('default', {month: 'short'});

      const closingPrice = parseFloat(data.closingPrices[index]);
      const highPrice = parseFloat(data.highPrices[index]);
      const lowPrice = parseFloat(data.lowPrices[index]);

      result.push({
        month: month,
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

 // If data is not available, show nothing or a placeholder
 if (!data) {
   return null;
 }



 /// Bar chart stuff:
 const hardCodedData = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
];

 

  return (
    <>
    <DashboardBox  gridArea="h">
      <BoxHeader
        title="Market Trends: Analyzing Price Movements"
        subtitle="Visual representation of high, closing, and low prices over time"
        sideText=""
      />
      <div style={{ width: '100%', height: '100%' }}>
        <ResponsiveContainer>
          <LineChart
            data={parsedData}
            margin={{ top: 20, right: 0, left: -10, bottom: 55 }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
            <XAxis dataKey="month" tickLine={false} style={{fontSize: "10px"}} domain={[newMinVal, newMaxVal]} />
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

    <DashboardBox  gridArea="f">
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
                data={hardCodedData}
                margin={{
                  top: 20,
                  right: 20,
                  left: -10,
                  bottom: 55,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
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

export default Row3;