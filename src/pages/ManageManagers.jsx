import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  collection,
  query,
  where,
  getDocs,
  db,
  updateDoc,
  doc,
} from "../services";
import Loader from "../components/Loader";

export default function ManageManagers() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    getIncidents();
  }, []);

  const getIncidents = async () => {
    setisLoading(true);
    setData([]);
    const myData = [];
    const q = query(collection(db, "users"), where("role", "==", "manager"));
    const querySnapshot = await getDocs(q);

    if (querySnapshot?.empty) {
      toast.info("No Managers Found!", {
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
        email: doc?.data()?.email,
        role: doc?.data()?.role,
        status: doc?.data()?.status,
      });
    });
    setData(myData);
    toast.success("Managers!", {
      position: "top-right",
    });
    setisLoading(false);
  };

  // HANDLE DEACTIVATE
  const handleDeactivate = async (id) => {
    // alert(id);
    setUpdating(true);
    let updatedData = data.map((item) => {
      return item.id === id ? { ...item, status: "InActive" } : item;
    });
    // console.log("updatedData: ", updatedData);
    setData(updatedData);

    const update = doc(db, "users", id);
    await updateDoc(update, {
      status: "InActive",
    });
    setUpdating(false);
  };

  // HANDLE DEACTIVATE
  const handleActivate = async (id) => {
    // alert(id);
    setUpdating(true);
    let updatedData = data.map((item) => {
      return item.id === id ? { ...item, status: "Active" } : item;
    });
    // console.log("updatedData: ", updatedData);
    setData(updatedData);

    const update = doc(db, "users", id);
    await updateDoc(update, {
      status: "Active",
    });
    setUpdating(false);
  };

  const Table = () => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-white">
          <thead className="text-xs text-white uppercase bg-gray-900">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((manager) => (
              <tr className="border-b bg-gray-800" key={Math.random()}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {manager?.email}
                </th>
                <td className="px-6 py-4">{manager?.role}</td>
                <td className="px-6 py-4">{manager?.status}</td>
                <td className="px-6 py-4">
                  {manager?.status === "Active" && (
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleDeactivate(manager?.id)}
                    >
                      Deactivate
                    </button>
                  )}
                  {manager?.status === "InActive" && (
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleActivate(manager?.id)}
                    >
                      Activate
                    </button>
                  )}
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
      {!isLoading && !updating && (
        <div>
          <Table />
        </div>
      )}
      {isLoading && <Loader title={"Getting Managers!"} />}
      {updating && <Loader title={"Saving Changes..."} />}
    </>
  );
}
