const ReportTable = ({ data = [] }) => {
  return (
    <div
      className="
bg-white
rounded-2xl
shadow
p-6
overflow-x-auto
"
    >
      <h2
        className="
font-bold
text-lg
mb-5
"
      >
        Top Selling Products
      </h2>

      <table
        className="
w-full
text-sm
"
      >
        <thead
          className="
bg-gray-100
"
        >
          <tr>
            <th className="p-3 text-left">Product</th>

            <th className="p-3">Quantity Sold</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item._id}
              className="
border-t
"
            >
              <td
                className="
p-3
"
              >
                {item.product?.name || "Unknown"}
              </td>

              <td
                className="
p-3
text-center
font-bold
"
              >
                {item.totalSold}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
