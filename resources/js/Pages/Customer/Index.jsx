import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Index({ customers }) {
    const [customersData, setCustomersData] = useState(customers);
    const [search, setSearch] = useState(null);

    useEffect(() => {
        axios.get(route("customer.index", { search: search })).then((res) => {
            setCustomersData(res.data);
        });
    }, [search]);

    const handleDelete = (event, customer) => {
        event.preventDefault();

        if (confirm("Are you sure you want to delete this estimate?")) {
            axios
                .post(route("customer.destroy", { customer: customer }))
                .then((res) => {
                    window.location.reload();
                });
        }
    };

    return (
        <AppLayout>
            <Head title="Customers" />
            <div className="mt-5 px-5">
                <p className="text-[1.5rem] font-bold">Customers</p>
                <div className="flex justify-between">
                    <div>
                        <Link
                            href={route("customer.create")}
                            className="bg-blue-700 text-sm px-6 py-2 rounded-lg text-white"
                        >
                            Create
                        </Link>
                    </div>

                    <div>
                        <TextInput
                            type="text"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {customersData?.map((customer, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {customer.full_name}{" "}
                                        </th>
                                        <td className="px-6 py-4">
                                            {customer.mobile_number}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.email}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.company}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {customer.address}{" "}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2 items-center">
                                            <Link
                                                href={route("customer.edit", {
                                                    customer: customer,
                                                })}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                            {/* <button
                                            onClick={
                                                (e) => {
                                                    handleDelete(e, customer)
                                                }
                                            }
                                            clanssName='text-red-600 hover:underline'>Delete</button> */}
                                        </td>
                                    </tr>
                                );
                            })}{" "}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}

export default Index;
