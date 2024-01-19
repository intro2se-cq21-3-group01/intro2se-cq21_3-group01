import React from "react";
import "./SaleReport.css";

const TableReportDetail = ({ data }) => {
  return (
    <table className="SaleReport-table-reportDetail">
      <thead>
        <tr>
          <th className="SaleReport-idProduct">Product ID</th>
          <th className="SaleReport-nameProduct">Name</th>
          <th className="SaleReport-quantity">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="SaleReport-idProduct">{item.id}</td>
            <td className="SaleReport-nameProduct">{item.name}</td>
            <td className="SaleReport-quantity">{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableReportDetail;
