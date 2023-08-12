import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import axios from "axios";

function Show({ estimate }) {
    console.log(estimate);

    const [showCrimpingCharges, setShowCrimpingCharges] = useState(false);
    const [showLoadingCharges, setShowLoadingCharges] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);

    const [crimpingCharges, setCrimpingCharges] = useState(null);
    const [loadingCharges, setLoadingCharges] = useState(null);
    const [discount, setDiscount] = useState(null);

    const addCrimpingCharges = (e) => {
        e.preventDefault();
        axios
            .post(
                route("estimate.addCrimpingCharges", {
                    estimate: estimate,
                    crimping_charges: crimpingCharges,
                })
            )
            .then((res) => {
                window.location.reload();
            });
    };

    const addLoadingCharges = (e) => {
        e.preventDefault();
        axios
            .post(
                route("estimate.addLoadingCharges", {
                    estimate: estimate,
                    loading_charges: loadingCharges,
                })
            )
            .then((res) => {
                window.location.reload();
            });
    };

    const addDiscount = (e) => {
        e.preventDefault();

        axios
            .post(
                route("estimate.addDiscount", {
                    estimate: estimate,
                    discount: discount,
                })
            )
            .then((res) => {
                window.location.reload();
            });
    };
    return (
        <AppLayout>
            <Head title="Customers" />
            <div className="mt-5 p-5 bg-white">
                <p className="text-[1.5rem] font-bold">
                    Estimate: EST{estimate.estimate_id}{" "}
                </p>
                <p>Date: {estimate.created_at.slice(0, 10)}</p>
                <div>
                    <p>Name: {estimate.customer.full_name}</p>
                    <p>Number: {estimate.customer.mobile_number}</p>
                    <p>Company: {estimate.customer.company}</p>
                    <p>Total: {estimate.amount}</p>
                </div>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Feet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price Per Kg
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price Per Unit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Final Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {estimate.estimate_products?.map((product, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {product.product_name}{" "}
                                        </th>
                                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            {product.color}{" "}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {product.quantity}{" "}
                                        </th>
                                        <td className="px-6 py-4">
                                            {product.feets}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.inches}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.kgs}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.total_kgs}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price_per_kg}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.price_per_unit}{" "}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2 items-center">
                                            {product.amount}{" "}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Total Kgs</td>
                                <td className="px-6 py-4">
                                    {estimate.total_kgs}{" "}
                                </td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Loading Charges</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {estimate.loading_charges}{" "}
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Crimping Charges</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {estimate.crimping_charges}{" "}
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Discount</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {estimate.discount}{" "}
                                </td>
                            </tr>
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Total Amount</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {estimate.total_amount}{" "}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setShowCrimpingCharges(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Crimping Charges
                    </button>
                    <button
                        onClick={() => {
                            setShowDiscount(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Discount{" "}
                    </button>
                    <button
                        onClick={() => {
                            setShowLoadingCharges(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Loading Charges
                    </button>
                    <Link
                        href={route("estimate.invoice", { estimate: estimate })}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Invoice
                    </Link>
                </div>

                <Modal
                    show={showCrimpingCharges}
                    onClose={() => {
                        setShowCrimpingCharges(false);
                    }}
                >
                    <form onSubmit={addCrimpingCharges} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Crimping Charges
                        </h2>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="crimping_charges"
                                value="Crimping Charges"
                                className="sr-only"
                            />

                            <TextInput
                                id="crimping_charges"
                                type="number"
                                name="crimping_charges"
                                onChange={(e) =>
                                    setCrimpingCharges(e.target.value)
                                }
                                className="mt-1 block w-3/4"
                                isFocused
                                required
                                placeholder="Crimping Charges   "
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => {
                                    setShowCrimpingCharges(false);
                                }}
                            >
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton className="ml-3">
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>

                <Modal
                    show={showDiscount}
                    onClose={() => {
                        setShowDiscount(false);
                    }}
                >
                    <form onSubmit={addDiscount} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Discount
                        </h2>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="discount"
                                value="Discount"
                                className="sr-only"
                            />

                            <TextInput
                                id="discount"
                                type="number"
                                name="discount"
                                onChange={(e) => setDiscount(e.target.value)}
                                className="mt-1 block w-3/4"
                                isFocused
                                required
                                placeholder="Discount"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => {
                                    setDiscount(false);
                                }}
                            >
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton className="ml-3">
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>

                <Modal
                    show={showLoadingCharges}
                    onClose={() => {
                        setShowLoadingCharges(false);
                    }}
                >
                    <form onSubmit={addLoadingCharges} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Loading Charges
                        </h2>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="loading_charges"
                                value="Loading Charges"
                                className="sr-only"
                            />

                            <TextInput
                                id="loading_charges"
                                type="number"
                                step="0.1"
                                min="0"
                                max="2"
                                name="loading_charges"
                                onChange={(e) =>
                                    setLoadingCharges(e.target.value)
                                }
                                className="mt-1 block w-3/4"
                                isFocused
                                required
                                placeholder="Loading Charges   "
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => {
                                    setShowLoadingCharges(false);
                                }}
                            >
                                Cancel
                            </SecondaryButton>

                            <PrimaryButton className="ml-3">
                                Submit
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </div>
        </AppLayout>
    );
}

export default Show;
