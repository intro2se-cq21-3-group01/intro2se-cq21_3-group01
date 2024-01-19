import React from "react";
import { useLocation } from "react-router-dom";
import "./SaleReport.css";
import TableTotal from "./TableTotal";
import TableReportDetail from "./TableReportDetail";

const SaleReport = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  console.log("startDate:", startDate);
  console.log("endDate:", endDate);

  return (
    <div className="saleReport">
      <div className="SaleReport-group-title">
        <h1 className="SaleReport-title">Sales report</h1>
        <div className="SaleReport-box-date">
          <p className="SaleReport-text-time">Time:</p>
          <p className="SaleReport-text-from">from {startDate}</p>
          <p className="SaleReport-text-to">to {endDate}</p>
        </div>
      </div>
      <div>
        <TableTotal
          data={
            [
              // Add more data as needed
            ]
          }
        />
      </div>
      <div>
        <h2 className="SaleReport-text-date-detail">
          From: {startDate}
          <br />
          To: {endDate}
        </h2>
        <div className="SaleReport-box-detail">
          <p className="SaleReport-text-detail">Total orders:</p>
          <p className="SaleReport-text-detail">Total products:</p>
          <p className="SaleReport-text-detail">Total revenue:</p>
        </div>
        <div>
          <TableReportDetail
            data={[
              { id: 1, name: "Product A", quantity: 10 },
              { id: 2, name: "Product B", quantity: 5 },
              { id: 3, name: "Product B", quantity: 5 },
              { id: 4, name: "Product B", quantity: 5 },
              { id: 5, name: "Product B", quantity: 5 },
              // Add more data as needed
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default SaleReport;
