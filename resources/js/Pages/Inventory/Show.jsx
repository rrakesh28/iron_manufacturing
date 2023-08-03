import React, { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { useEffect } from "react";

function Show({ inventory, balance }) {
    console.log(inventory);

    const [showModal, setShowModal] = useState(false);


    const [search,setSearch] = useState(null)
    const [inventoryLogs,setInventoryLogs] = useState(inventory.logs)

    useEffect(() => {
        axios.get(route('inventory.getLogs',{inventory:inventory.id,search:search})).then((res)=>{
            // console.log(res.data)
            setInventoryLogs(res.data)
        })
    }, [search])
    
    
    const { data, setData, post, processing, errors, reset } = useForm({
        in: "",
    });
    const getlog = (item, log_type) => {
        if (item.log_type === log_type) {
            if (inventory.unit_type === "Weight") {
                return item.weight;
            } else {
                return item.quantity;
            }
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('inventory.add',{inventory:inventory}),{
            onSuccess: ()=> window.location.reload()
        })
    };
    return (
        <AppLayout>
            <Head title="Inventory" />
            <div className="mt-5 px-5">
                <p className="text-[1.5rem] font-bold">Inventory Logs</p>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="bg-white p-4">
                    <table>
                        <tr>
                            <td className="font-bold">Product Name:</td>
                            <td className="pr-[2rem]">
                                {inventory.product.name}
                            </td>
                            <td className="font-bold">Unit Type:</td>
                            <td className="pr-[2rem]">
                                {inventory.product.unit_type}
                            </td>
                            <td className="font-bold">In Kgs:</td>
                            <td className="pr-[2rem]">
                                {inventory.product.in_kgs}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold">Price Per Kg:</td>
                            <td>{inventory.product.price_per_kg}</td>
                            <td className="font-bold">Price Per Unit:</td>
                            <td>{inventory.product.price_per_unit}</td>
                        </tr>
                    </table>
                </div>
                <div className="flex justify-center mt-5">
                    <button
                        onClick={() => {
                            setShowModal(true);
                        }}
                        className="text-white px-6 py-2 text-sm rounded-lg bg-blue-700"
                    >
                        Add Quantity
                    </button>
                </div>

                <div>
                    <TextInput type="text" onChange={(e)=>setSearch(e.target.value)} />
                </div>
                <div className="relative overflow-x-auto mt-10">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    in
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    out
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Id
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {inventoryLogs?.map((item, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.created_at.slice(0, 10)}{" "}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {getlog(item, "in")}
                                        </th>
                                        <td className="px-6 py-4">
                                            {getlog(item, "out")}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.bill_id}
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr className="bg-white border-b ">
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                >
                                    Balance
                                </th>
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                ></th>
                                <td className="px-6 py-4">{balance.toFixed(2)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                show={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <form onSubmit={submit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Add</h2>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="in"
                            value="Add"
                            className="sr-only"
                        />

                        <TextInput
                            id="add"
                            type="number"
                            name="add"
                            className="mt-1 block w-3/4"
                            onChange={(e) => setData('in',e.target.value)}
                            isFocused
                            required
                            placeholder="Add"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton
                            onClick={() => {
                                setShowModal(false);
                            }}
                        >
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ml-3">Submit</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AppLayout>
    );
}

export default Show;
