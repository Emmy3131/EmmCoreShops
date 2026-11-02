import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const ReportChart = ({ data = [] }) => {

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">
          Sales Overview
        </h2>

        <p className="text-sm text-gray-500">
          Revenue performance over time
        </p>
      </div>


      <div className="h-[320px]">

        {
          data.length === 0 ? (

            <div className="
              h-full
              flex
              items-center
              justify-center
              text-gray-400
              border-2
              border-dashed
              rounded-xl
            ">
              No sales data available
            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                />


                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => {
                    const d = new Date(date);

                    return d.toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    });
                  }}
                />

                <YAxis
                  tickFormatter={(value) =>
                    `₦${Number(value).toLocaleString()}`
                  }
                />


                <Tooltip
                  labelFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-NG", {
                      weekday: "short",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }
                  formatter={(value) => [
                    `₦${Number(value).toLocaleString()}`,
                    "Sales",
                  ]}
                />


                <Line
                  type="monotone"
                  dataKey="totalSales"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />

              </LineChart>


            </ResponsiveContainer>

          )
        }


      </div>

    </div>
  );
};


export default ReportChart;