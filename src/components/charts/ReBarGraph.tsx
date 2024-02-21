import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {IReBarGraphProps} from "@/utils/interfaces/IReGraphProps";

const ReBarGraph: React.FC<IReBarGraphProps> = ({data, dataOptionSet, options}) => {

    const renderBars = () => {
        return dataOptionSet.map((option, index) => (
            <Bar
                key={index}
                dataKey={option.key}
                fill={option.color}
                radius={[3, 3, 0, 0]}
            />
        ));
    };

    return (
        <ResponsiveContainer width="99%">
            <BarChart
                data={data}
                margin={{
                    top: 73,
                }}
            >
                <CartesianGrid strikethroughPosition={1} strokeWidth={1} vertical={false}/>
                <XAxis dataKey="name" style={{stroke: 'transparent'}} fill={'#FFCC99'}/>
                <YAxis style={{stroke: 'transparent'}}/>
                {options.tooltip && <Tooltip cursor={{fill: 'transparent'}}/>}
                {renderBars()}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ReBarGraph;
