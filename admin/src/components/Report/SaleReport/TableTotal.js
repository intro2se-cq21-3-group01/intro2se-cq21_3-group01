import React from "react";
import "./SaleReport.css";

const TableTotal = ({ data }) => {
  return (
    <table className="SaleReport-table-total">
      <thead>
        <tr>
          <th className="SaleReport-date">Date</th>
          <th className="SaleReport-totalOrders">Total orders</th>
          <th className="SaleReport-totalProducts">Total products</th>
          <th className="SaleReport-totalRevenue">Total revenue</th>
          <th className="-SaleReport-detail">Detail</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="SaleReport-date">{item.date}</td>
            <td className="SaleReport-totalOrders">{item.totalOrders}</td>
            <td className="SaleReport-totalProducts">{item.totalProducts}</td>
            <td className="SaleReport-totalRevenue">{item.totalRevenue}</td>
            <td className="SaleReport-detail">
              <button>Detail</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableTotal;
