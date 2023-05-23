import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { collection, db, query, getDocs, updateDoc, doc } from "../services";
import Loader from "../components/Loader";
import { useStateContext } from "../context";

const ManageProperties = () => {
  const { selected, setSelected, properties, setProperties, docId, setDocId } =
    useStateContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    getProperties();
  }, []);

  const getProperties = async () => {
    setIsLoading(true);

    const q = query(collection(db, "general"));

    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      setIsLoading(false);
      return;
    }

    querySnapshot?.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log("MP", doc.data()?.properties);
      setDocId(doc.id);
      setProperties(doc.data()?.properties);
    });
    setIsLoading(false);
  };

  // DELETE PROPERTY
  const handleDelete = async (propIndex) => {
    setIsLoading(true);
    // alert(propIndex);
    const filteredProperties = properties?.filter((property, index) => {
      return index !== propIndex;
    });
    // console.log("Filtered:", filteredProperties);
    setProperties(filteredProperties);

    const ref = doc(db, "general", docId);
    await updateDoc(ref, {
      properties: filteredProperties,
    });

    setIsLoading(false);
  };

  const Table = () => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-white uppercase bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Property
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {properties?.map((property, index) => (
              <tr className="border-b bg-gray-800" key={Math.random()}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {property?.label}
                </th>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      {!isLoading && (
        <>
          <div className="flex justify-end">
            <button
              className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              mt-8"
              onClick={() => {
                setSelected("");
                navigate("/AddProperty");
              }}
            >
              Add Property
            </button>
          </div>
          <Table />
        </>
      )}
      {isLoading && <Loader title="Getting Properties..." />}
    </>
  );
};

export default ManageProperties;
