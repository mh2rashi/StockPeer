import DashboardBox from "@/components/DashboardBox";
import { useGetBalanceSheetQuery } from "@/state/yahooAPI";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';
import BoxHeader from "../../components/BoxHeader" // Replace with actual path to BoxHeader component

import "../../index.css";

type Props = {
  searchQuery: string;
};

const BalanceSheet = ({ searchQuery }: Props) => {

  const { data, isLoading, error } = useGetBalanceSheetQuery(searchQuery);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return null;
  }

    const innerData = [
        { name: data["currentLst3"][0], value: parseInt(data["currentLst3"][1].replace(/,/g, ''),10) },
        { name: data["currentLst6"][0], value: parseInt(data["currentLst6"][1].replace(/,/g, ''),10) },
        { name: data["currentLst8"][0], value: parseInt(data["currentLst8"][1].replace(/,/g, ''),10) },
    ];

    const outerData = [
        { name: data["currentLst1"][0], value: parseInt(data["currentLst1"][1].replace(/,/g, ''),10) },
        { name: data["currentLst2"][0], value: parseInt(data["currentLst2"][1].replace(/,/g, ''),10) },
        { name: data["currentLst4"][0], value: parseInt(data["currentLst4"][1].replace(/,/g, ''),10) },
        { name: data["currentLst5"][0], value: parseInt(data["currentLst5"][1].replace(/,/g, ''),10) },
        { name: data["currentLst7"][0], value: parseInt(data["currentLst7"][1].replace(/,/g, ''),10) },
    ];

   return (
     
    <>
     <DashboardBox gridArea="e">
          <BoxHeader
                title="Balance Sheet Breakdown"
                subtitle="All numbers in thousands"
                sideText= {data["currentLst9"][1]}
          />
          <div style={{ width: "100%", height: "calc(100% - 50px)"}}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                <Pie data={innerData} dataKey="value" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" />
                <Pie data={outerData} dataKey="value" cx="50%" cy="50%" innerRadius={130} outerRadius={150} fill="#82ca9d" label={'hello'} />
                </PieChart>
                <Tooltip />
            </ResponsiveContainer>   
          </div>
        </DashboardBox>
     </>
   );
};

export default BalanceSheet;
