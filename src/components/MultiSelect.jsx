import React, { useState, useEffect } from "react";
import Select from "react-select";
import { HashLoader } from "react-spinners";

import { collection, db, query, getDocs } from "../services";

export default function MultiSelectDropdown({
  selectedOptions,
  setSelectedOptions,
}) {
  const [properties, setProperties] = useState(null);
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
      // console.log(doc.data()?.properties);
      setProperties(doc.data()?.properties);
    });
    setIsLoading(false);
  };

  const handleSelect = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  return (
    <>
      {!isLoading && (
        <Select
          options={properties}
          isMulti
          value={selectedOptions}
          onChange={handleSelect}
          placeholder="Select Properties"
        />
      )}
      {isLoading && (
        <HashLoader className="w-6 h-6 text-center" color="#111827" />
      )}
    </>
  );
}
