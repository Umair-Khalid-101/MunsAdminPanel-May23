import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { collection, query, where, getDocs, db } from "../services";
import Loader from "../components/Loader";

export default function IncidentReports() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    getIncidents();
  }, []);

  // SEARCH
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const getIncidents = async () => {
    setisLoading(true);
    setData([]);
    const myData = [];
    const q = query(collection(db, "incident"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      toast.info("No Incident Reports Found!", {
        position: "top-right",
      });
      setisLoading(false);
      return;
    }

    querySnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      myData.push({
        id: doc?.id,
        apartment: doc?.data()?.apartment,
        other: doc?.data()?.other,
        issue: doc?.data()?.issue,
        statename: doc?.data()?.statename,
        cityname: doc?.data()?.cityname,
        propertyname: doc?.data()?.propertyname,
        reportedBy: doc?.data()?.reportedBy,
        reportedDate: doc?.data()?.reportedDate,
        reportedTime: doc?.data()?.reportedTime,
        incidentImage: `${
          doc?.data()?.incidentImage ? doc?.data()?.incidentImage : ""
        }`,
      });
    });
    setData(myData);
    // toast.success("Incident Reports", {
    //   position: "top-right",
    // });
    setisLoading(false);
  };

  return (
    <>
      {!isLoading && (
        <div className="flex flex-col items-center mt-2">
          <div className="relative w-full max-w-md my-3">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 rounded-[8px] py-2 pr-8 pl-3 w-full focus:outline-none focus:shadow-outline"
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <MdSearch className="w-6 h-6 fill-current text-gray-500" />
            </div>
          </div>
          <ul className="w-full">
            {data
              ?.filter((incident) => {
                if (searchInput === "") {
                  return incident;
                } else if (
                  incident.issue
                    .toLowerCase()
                    .includes(searchInput.toLowerCase())
                ) {
                  return incident;
                }
              })
              .map((incident, index) => (
                <li
                  key={index}
                  className="bg-gray-700 shadow-md rounded-lg mb-2 py-2 px-4 flex justify-between items-center md:flex-row flex-col md:gap-0 gap-2"
                >
                  <span className="text-white w-[70%]">{incident?.issue}</span>
                  <div
                    className="flex justify-center items-center xl:flex-row lg:flex-col flex-col
                gap-2
                "
                  >
                    <button
                      className="h-8 p-3 bg-slate-800 rounded-[6px]
                  text-white flex justify-center items-center hover:bg-slate-900
                  hover:font-semibold duration-500
                "
                      onClick={() => {
                        navigate("/report", {
                          state: incident,
                        });
                      }}
                    >
                      View Report
                    </button>
                    <button
                      className="h-8 p-3 bg-slate-800 rounded-[6px]
                  text-white flex justify-center items-center hover:bg-slate-900
                  hover:font-semibold duration-500
                "
                      onClick={() => {
                        navigate("/document", {
                          state: incident,
                        });
                      }}
                    >
                      Download
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
      {isLoading && <Loader title={"Getting Incident Reports!"} />}
    </>
  );
}
