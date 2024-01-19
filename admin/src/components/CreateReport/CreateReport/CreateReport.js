import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "../Calendar/Calendar";
import "./CreateReport.css";

const CreateReport = () => {
  const navigate = useNavigate();

  const handleCreate = async (redirectTo) => {
    try {
      navigate(redirectTo);
    } catch (err) {
      console.error("Error creating report:", err);
    }
  };

  return (
    <div className="frame-createReport">
      <div className="create-performance-report">
        <h1 className="text-title">Create performance analysis</h1>
        <div className="form-calendar">
          <h2 className="label-text">Select time:</h2>
          <div className="calendar">
            <Calendar />
          </div>
          <button
            className="button"
            type="button"
            onClick={() => handleCreate("/performance-report")}
          >
            Create
          </button>
        </div>
      </div>
      <div className="create-sale-report">
        <h1 className="text-title">Create sale report</h1>
        <div className="form-calendar">
          <h2 className="label-text">Select time:</h2>
          <div className="calendar">
            <Calendar />
          </div>
          <button
            className="button"
            type="button"
            onClick={() => handleCreate("/sale-report")}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReport;
