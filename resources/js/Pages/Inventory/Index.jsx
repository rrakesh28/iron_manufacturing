import React, { useEffect, useState } from "react";
// import PurchasesLayout from '@/Layouts/PurchasesLayout';
import AppLayout from "@/Layouts/AppLayout";
import { Head, Link } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import axios from "axios";

function Index({ inventory }) {
    console.log(inventory);


    const [search,setSearch] = useState(null)
    const [inventoryData,setInventoryData] = useState(inventory)
    
    useEffect(() => {
        axios.get(route('inventory.index',{search:search})).then((res)=>{
            setInventoryData(res.data)
            console.log(res.data)
        })
    }, [search])
    


    const handleDelete = (event, inventory) => {
        event.preventDefault();

        if (confirm("Are you sure you want to delete this inventory?")) {
            axios
                .post(route("inventory.destroy", { inventory: inventory }))
                .then((res) => {
                    window.location.reload();
                });
        }
    };
    return (
        <AppLayout>
            <Head title="Inventory" />
            <div className="mt-5 px-5">
                <p className="text-[1.5rem] font-bold">Inventory</p>
                <div className="flex justify-between">
                    <div>
                        <Link
                            href={route("inventory.create")}
                            className="bg-blue-700 text-sm px-6 py-2 rounded-lg text-white"
                        >
                            Create
                        </Link>
                    </div>
                    <div>
                        <TextInput type="text" onChange={(e)=>setSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Unit Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Opening
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Utilized
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Remaining
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {" "}
                            {inventoryData?.map((item, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="bg-white border-b "
                                    >
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.created_at.slice(0, 10)}
                                        </th>
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                                        >
                                            {item.product.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.unit_type}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.opening}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.utilized}
                                        </td>
                                        <td className="px-6 py-4">
                                            {item.remaining.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 flex gap-2 items-center">
                                            <Link
                                                href={route("inventory.show", {
                                                    inventory: item,
                                                })}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Show
                                            </Link>
                                            <button
                                                href={route(
                                                    "inventory.destroy",
                                                    { inventory: item }
                                                )}
                                                method="post"
                                                onClick={(e) => {
                                                    handleDelete(e, item);
                                                }}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </button>
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
