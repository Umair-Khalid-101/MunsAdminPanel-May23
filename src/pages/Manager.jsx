import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  getAuth,
  createUserWithEmailAndPassword,
  collection,
  db,
  addDoc,
} from "../services";
import Loader from "../components/Loader";
import MultiSelect from "../components/MultiSelect";

export default function Manager() {
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange1 = (e) => {
    setSelected1(e.target.value);
  };

  const status = [
    { label: "Active", value: "Active" },
    { label: "InActive", value: "Inactive" },
  ];

  // FORM VALIDATION
  const formSchema = yup.object().shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be a minimum of 8 characters."),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Email Must be Valid"
      ),
    status: yup.string().required("Status Cannot be Empty!"),
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
    data.role = "manager";
    data.properties = selectedOptions;
    // console.log(data);
    const email = data?.email.toLowerCase();
    const password = data?.password;
    const auth = getAuth();
    setIsLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential?.user;
        // console.log("Manager Created:", user);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            email: data?.email.toLowerCase(),
            password: data?.password,
            status: data?.status,
            role: data?.role,
            properties: data?.properties,
          });
          // console.log("Document written with ID: ", docRef.id);
          setIsLoading(false);
        } catch (error) {
          // console.log(error);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`${errorCode}\n${errorMessage}`);
        setIsLoading(false);
      });
    reset();
  };
  return (
    <>
      {!isLoading && (
        <div className="flex min-h-full w-full flex-col justify-center py-2 sm:px-6 lg:px-8">
          <div className="sm:mx-auto w-full">
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create A New Manager:
            </h2>
          </div>

          <div className="mt-2 sm:mx-auto w-full">
            <div className="bg-white pb-12 pt-4 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-3" autoComplete="off">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email")}
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors.email
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                      placeholder="test@test.com"
                    />
                    {errors.email ? (
                      <div className="text-red-500 text-small">
                        {errors.email.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("password")}
                      autoComplete="off"
                      type="password"
                      className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors.password
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                      placeholder="********"
                    />
                    {errors.password ? (
                      <div className="text-red-500 text-small">
                        {errors.password.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <MultiSelect
                  selectedOptions={selectedOptions}
                  setSelectedOptions={setSelectedOptions}
                />
                {/* <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Property:
                  </label>
                  <select
                    {...register("route")}
                    className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors.route
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                    value={selected}
                    onChange={handleChange}
                  >
                    <option value="">Select a Property</option>
                    {routes.map(({ label, value }) => (
                      <option
                        key={value}
                        value={value}
                        className="block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      sm:text-sm sm:leading-6 outline-none"
                      >
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.route ? (
                    <div className="text-red-500 text-small">
                      {errors.route.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div> */}

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Status:
                  </label>
                  <select
                    {...register("status")}
                    className={`block w-full rounded-md border-0 py-1.5
                      text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                      placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none
                      ${
                        errors.status
                          ? "focus:ring-2 focus:ring-inset focus:ring-red-600"
                          : "focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      } pl-3`}
                    value={selected1}
                    onChange={handleChange1}
                  >
                    <option value="">Select Status</option>
                    {status.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.status ? (
                    <div className="text-red-500 text-small">
                      {errors.status.message}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                    mt-8"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Create Valet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loader title={"Creating Valet!"} />}
    </>
  );
}
