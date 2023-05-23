import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Incident = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log("REPORT:", state);
  return (
    <div
      className="flex justify-center items-center w-full
    min-h-screen"
    >
      <div className="bg-white rounded-lg shadow-md p-12 w-[90%]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">{state?.issue}</h2>
          <p className="text-sm text-gray-500">
            Reported on {state?.reportedDate} at {state?.reportedTime}
          </p>
        </div>
        <div className="flex items-center mb-4">
          <img
            src={state?.incidentImage}
            alt="Card"
            className="w-60 h-60 object-cover rounded-md"
          />
          <div className="ml-4">
            <p className="text-base font-medium">{state?.propertyname}</p>
            <p className="text-gray-500 text-sm">
              {state?.apartment}, {state?.statename}, {state?.cityname}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-base">{state?.other}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Reported by {state?.reportedBy}
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => {
              navigate("/IncidentReports");
            }}
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Incident;
