import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { db, doc, updateDoc } from "../services";
import Loader from "../components/Loader";
import { useStateContext } from "../context";

const AddProperty = () => {
  const navigate = useNavigate();
  const { properties, setProperties, docId, setDocId } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  // console.log("AddProperty:", properties);

  // FORM VALIDATION
  const formSchema = yup.object().shape({
    property: yup.string().required("Property Cannot be Empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const newProperty = {
      label: data?.property,
      value: data?.property,
    };
    let updatedProperties = properties;
    updatedProperties.push(newProperty);
    // console.log("Updated Properties:", updatedProperties);

    const ref = doc(db, "general", docId);
    await updateDoc(ref, {
      properties: updatedProperties,
    });
    setIsLoading(false);
    reset();
    navigate("/ManageProperties");
  };

  return (
    <>
      {!isLoading && (
        <div className="flex min-h-full w-full flex-col justify-center py-2 sm:px-6 lg:px-8">
          <div className="sm:mx-auto w-full">
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Property:
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto w-full">
            <div className="bg-white pb-12 pt-4 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-3" autoComplete="off">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Property Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("property")}
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors.property
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                      placeholder="Your Property Name"
                    />
                    {errors.property ? (
                      <div className="text-red-500 text-small">
                        {errors.property.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    mt-8"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Add Property
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader title={"Adding Property!"} />}
    </>
  );
};

export default AddProperty;
