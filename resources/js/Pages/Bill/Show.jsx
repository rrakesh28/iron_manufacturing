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
function Show({ bill }) {
    console.log(bill);

    const [showCrimpingCharges, setShowCrimpingCharges] = useState(false);
    const [showLoadingCharges, setShowLoadingCharges] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [showTransportCharges, setShowTransportCharges] = useState(false);

    const [crimpingCharges, setCrimpingCharges] = useState(null);
    const [loadingCharges, setLoadingCharges] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [transportCharges, setTransportCharges] = useState(null);

    const addTransportCharges = (e) => {
        e.preventDefault();
        axios
            .post(
                route("bill.addTransportCharges", {
                    bill: bill,
                    transport_charges: transportCharges,
                })
            )
            .then((res) => {
                window.location.reload();
            });
    };

    const addCrimpingCharges = (e) => {
        e.preventDefault();
        axios
            .post(
                route("bill.addCrimpingCharges", {
                    bill: bill,
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
                route("bill.addLoadingCharges", {
                    bill: bill,
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
                route("bill.addDiscount", {
                    bill: bill,
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
                    Bill: BIL{bill.bill_id}{" "}
                </p>
                <p>Date: {bill.created_at.slice(0, 10)}</p>
                <div>
                    <p>Name: {bill.customer.full_name}</p>
                    <p>Number: {bill.customer.mobile_number}</p>
                    <p>Company: {bill.customer.company}</p>
                    <p>Estimated Total: {bill.estimated_amount}</p>
                    <p>Final Total: {bill.amount}</p>
                </div>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 overflow-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 overflow-auto">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Feet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Feet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price Per Kg
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price Per Unit
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Total amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {bill.bill_products?.map((product, key) => {
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
                                        <td className="px-6 py-4">
                                            {product.estimated_quantity}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.estimated_feets}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.estimated_inches}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.estimated_kgs}{" "}
                                        </td>
                                        <td className="px-6 py-4">
                                            {product.estimated_loading_charges}{" "}
                                        </td>
                                        <td>
                                            {product.estimated_total_amount}
                                        </td>
                                        <td>{product.final_quantity}</td>
                                        <td>{product.final_feets}</td>
                                        <td>{product.final_inches}</td>
                                        <td>{product.final_kgs}</td>
                                        <td>{product.final_total_kgs}</td>
                                        <td>{product.price_per_kg}</td>
                                        <td>{product.price_per_unit}</td>
                                        <td>{product.final_total_amount}</td>
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
                                    {bill.final_total_kgs}{" "}
                                </td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Loading Charges</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {bill.final_loading_charges}{" "}
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
                                <td className="px-6 py-4">Transport Charges</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {bill.final_transport_charges}{" "}
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
                                    {bill.final_crimping_charges}{" "}
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
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Discount</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {bill.final_discount}{" "}
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
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Total Amount</td>
                                <td className="px-6 py-4 flex gap-2 items-center">
                                    {bill.amount}{" "}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => {
                            setShowTransportCharges(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Transport Charges
                    </button>
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
                            setShowLoadingCharges(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Loading Charges
                    </button>
                    <button
                        onClick={() => {
                            setShowDiscount(true);
                        }}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Add Discount
                    </button>
                    <Link
                        href={route("bill.invoice", { bill: bill })}
                        className="block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                        Invoice
                    </Link>
                </div>
                <Modal
                    show={showTransportCharges}
                    onClose={() => {
                        setShowTransportCharges(false);
                    }}
                >
                    <form onSubmit={addTransportCharges} className="p-6">
                        <h2 className="text-lg font-medium text-gray-900">
                            Add Transport Charges
                        </h2>

                        <div className="mt-6">
                            <InputLabel
                                htmlFor="transport_charges"
                                value="Transport Charges"
                                className="sr-only"
                            />

                            <TextInput
                                id="transport_charges"
                                type="number"
                                step="0.01"
                                name="transport_charges"
                                onChange={(e) =>
                                    setTransportCharges(e.target.value)
                                }
                                className="mt-1 block w-3/4"
                                isFocused
                                required
                                placeholder="Add Transport Charges"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => {
                                    setShowTransportCharges(false);
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
                                placeholder="Add Discount"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <SecondaryButton
                                onClick={() => {
                                    setShowDiscount(false);
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
