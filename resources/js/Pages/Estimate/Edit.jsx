import React, { useEffect, useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import Modal from "@/Components/Modal";
import { Head, Link, useForm } from "@inertiajs/react";
import Select from "react-select";
import axios from "axios";

function Edit({ products, estimate }) {
    const [customer, setCusomter] = useState(estimate.customer);
    const { data, setData, post, processing, errors, reset } = useForm({
        customer: "",
        products: [],
    });

    useEffect(() => {
        const updatedProducts = estimate.estimate_products.map(
            (product, index) => ({
                product: product.product,
                price_per_kg: product.price_per_kg,
                quantity: product.quantity,
                unit: product.unit_selected,
                feet: product.feets,
                inches: product.inches,
                color: product.color,
                kgs: product.kgs,
                id: product.id,
            })
        );

        setData((data) => ({
            ...data,
            products: [...data.products, ...updatedProducts],
        }));
    }, []);
    const handleFormChange = (event, index) => {
        let products = [...data.products];
        products[index][event.target.name] = event.target.value;
        setData("products", products);
    };

    const handleUnitSelect = (event, index) => {
        let products = [...data.products];
        products[index]["unit"] = event.target.value;
        setData("products", products);
    };
    const addProduct = () => {
        let object = {
            product: "",
            price_per_kg: "",
            loading_charges: 0,
            discount: "",
            quantity: "",
            unit: "",
            feet: "",
            color: "",
            inches: "",
            kgs: "",
        };

        setData("products", [...data.products, object]);
    };

    const handleProductSelect = (event, index) => {
        axios
            .get(route("product.get", { product: event.value }))
            .then((res) => {
                let product = res.data;
                let products = [...data.products];
                products[index]["product"] = product;
                if (
                    product.unit_type === "Feet" ||
                    product.unit_type === "Kgs"
                ) {
                    products[index]["price_per_kg"] = product.price_per_kg;
                }
                setData("products", products);
            });
    };

    const removeProduct = (index, product) => {
        if (
            confirm(
                "Are you sure you want to delete? This operation is not irriversible."
            )
        ) {
            if (data.products.length > 1) {
                if (product.id) {
                    axios
                        .post(
                            route("estimate.delete.product", {
                                product: product.id,
                            })
                        )
                        .then((res) => {
                            console.log(res.data)
                            let productsData = [...data.products];
                            productsData.splice(index, 1);
                            setData("products", productsData);
                        });
                } else {
                    let productsData = [...data.products];
                    productsData.splice(index, 1);
                    setData("products", productsData);
                }
            }
        }
    };

    const getCustomer = (event) => {
        setData("customer", event.value);
        axios
            .get(route("customer.get", { customer: event.value }))
            .then((res) => {
                setCusomter(res.data);
            });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("estimate.update",{estimate:estimate}));
    };
    return (
        <AppLayout>
            <Head title="Edit Estimate" />
            <div className="mt-5 px-5">
                <p className="text-[1.5rem] font-bold">Edit Estimate</p>
            </div>
            <div className="mt-10 px-[2rem]">
                <div className="bg-white w-[50rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="customer" value="Customer" />
                            <InputError
                                message={errors.customer}
                                className="mt-2"
                            />{" "}
                            {customer && (
                                <table className="w-full mt-2">
                                    <thead>
                                        <tr>
                                            <th className="border border-black">
                                                Name
                                            </th>
                                            <th className="border border-black">
                                                Number
                                            </th>
                                            <th className="border border-black">
                                                Company
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-black">
                                                {customer?.full_name}
                                            </td>
                                            <td className="border border-black">
                                                {customer?.mobile_number}
                                            </td>

                                            <td className="border border-black">
                                                {customer?.company}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}{" "}
                        </div>
                        {customer &&
                            data.products.map((productSelected, index) => {
                                const defaultOption = products.find(
                                    (product) =>
                                        product.value ===
                                        productSelected.product.id
                                );
                                return (
                                    <div
                                        className="border-t-[2px] border-black mt-2 grid grid-cols-3 gap-4 "
                                        key={index}
                                    >
                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="product"
                                                value="Product"
                                            />

                                            <Select
                                                options={products}
                                                defaultValue={defaultOption}
                                                onChange={(e) =>
                                                    handleProductSelect(
                                                        e,
                                                        index
                                                    )
                                                }
                                            />
                                            <InputError
                                                message={errors.product}
                                                className="mt-2"
                                            />
                                        </div>

                                        {productSelected.product &&
                                            productSelected.product
                                                .unit_type !== "Unit" && (
                                                <div className="mt-4">
                                                    <InputLabel
                                                        htmlFor="unit"
                                                        value="Unit"
                                                    />
                                                    <div className="flex gap-4 flex-wrap">
                                                        {productSelected.product
                                                            .unit_type ===
                                                            "Feet" && (
                                                            <div className="flex gap-4">
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        name={`unit_${index}`}
                                                                        id="unit"
                                                                        value="Feet"
                                                                        checked={
                                                                            productSelected.unit ===
                                                                            "Feet"
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleUnitSelect(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                        required
                                                                    />
                                                                    <span>
                                                                        Feet
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        name={`unit_${index}`}
                                                                        id="unit"
                                                                        value="Inches"
                                                                        checked={
                                                                            productSelected.unit ===
                                                                            "Inches"
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleUnitSelect(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                        required
                                                                    />
                                                                    <span>
                                                                        Inches
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {(productSelected
                                                            .product
                                                            .unit_type ===
                                                            "Kgs" ||
                                                            productSelected
                                                                .product
                                                                .unit_type ===
                                                                "Feet") && (
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    type="radio"
                                                                    name={`unit_${index}`}
                                                                    id="unit"
                                                                    value="Kgs"
                                                                    checked={
                                                                        productSelected.unit ===
                                                                        "Kgs"
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        handleUnitSelect(
                                                                            e,
                                                                            index
                                                                        )
                                                                    }
                                                                    required
                                                                />
                                                                <span>Kgs</span>
                                                            </div>
                                                        )}{" "}
                                                    </div>

                                                    <InputError
                                                        message={errors.unit}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            )}

                                        <div className="mt-4">
                                            <InputLabel
                                                htmlFor="quantity"
                                                value="Quantity"
                                            />

                                            <TextInput
                                                id="quantity"
                                                type="number"
                                                name="quantity"
                                                value={productSelected.quantity}
                                                className="mt-1 block w-full"
                                                onChange={(e) => {
                                                    handleFormChange(e, index);
                                                }}
                                                required
                                            />
                                        </div>

                                        {productSelected.unit === "Feet" && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="color"
                                                    value="Color"
                                                />

                                                <select
                                                    name="color"
                                                    id="color"
                                                    className="w-full border rounded-lg"
                                                    defaultValue={
                                                        productSelected.color
                                                    }
                                                    onChange={(e) => {
                                                        handleFormChange(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    required
                                                >
                                                    <option
                                                        value=""
                                                        selected
                                                        disabled
                                                    >
                                                        Select Color
                                                    </option>
                                                    <option value="light blue ">
                                                        light blue{" "}
                                                    </option>
                                                    <option value="nova blue">
                                                        nova blue
                                                    </option>
                                                    <option value="torquoise blue">
                                                        torquoise blue
                                                    </option>
                                                    <option value="taraus blue">
                                                        taraus blue
                                                    </option>
                                                    <option value="silver">
                                                        silver
                                                    </option>
                                                    <option value="graphite gray">
                                                        graphite gray
                                                    </option>
                                                    <option value="haif white">
                                                        haif white
                                                    </option>
                                                    <option value="orange">
                                                        orange
                                                    </option>
                                                    <option value="mist green">
                                                        mist green
                                                    </option>
                                                    <option value="brick red">
                                                        brick red
                                                    </option>
                                                    <option value="terracotta">
                                                        terracotta
                                                    </option>
                                                    <option value="yellow">
                                                        yellow
                                                    </option>
                                                    <option value="red">
                                                        red
                                                    </option>
                                                    <option value="dark green">
                                                        dark green
                                                    </option>
                                                </select>
                                                <InputError
                                                    message={errors.feet}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}

                                        {productSelected.unit === "Feet" && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="feet"
                                                    value="Feet"
                                                />

                                                <TextInput
                                                    id="feet"
                                                    type="number"
                                                    name="feet"
                                                    value={productSelected.feet}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => {
                                                        handleFormChange(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    required
                                                />

                                                <InputError
                                                    message={errors.feet}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        {(productSelected.unit === "Feet" ||
                                            productSelected.unit ===
                                                "Inches") && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="inches"
                                                    value="Inches"
                                                />

                                                <TextInput
                                                    id="inches"
                                                    type="number"
                                                    name="inches"
                                                    value={
                                                        productSelected.inches
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => {
                                                        handleFormChange(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    required
                                                />

                                                <InputError
                                                    message={errors.inches}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        {productSelected.unit === "Kgs" && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="kgs"
                                                    value="Kgs"
                                                />

                                                <TextInput
                                                    id="kgs"
                                                    type="number"
                                                    step="0.01"
                                                    name="kgs"
                                                    value={productSelected.kgs}
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => {
                                                        handleFormChange(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    required
                                                />

                                                <InputError
                                                    message={errors.kgs}
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        {(productSelected.unit === "Kgs" ||
                                            productSelected.unit === "Feet" ||
                                            productSelected.unit ===
                                                "Inches") && (
                                            <div className="mt-4">
                                                <InputLabel
                                                    htmlFor="price_per_kg"
                                                    value="Price Per Kg"
                                                />

                                                <TextInput
                                                    id="price_per_kg"
                                                    type="number"
                                                    step="0.01"
                                                    name="price_per_kg"
                                                    value={
                                                        productSelected.price_per_kg
                                                    }
                                                    className="mt-1 block w-full"
                                                    onChange={(e) => {
                                                        handleFormChange(
                                                            e,
                                                            index
                                                        );
                                                    }}
                                                    required
                                                />

                                                <InputError
                                                    message={
                                                        errors.price_per_kg
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={(e) =>
                                                        removeProduct(
                                                            index,
                                                            productSelected
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-red-600 text-white"
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        {customer && (
                            <div className="mt-5 flex justify-center">
                                <button
                                    onClick={(e) => {
                                        addProduct();
                                    }}
                                    type="button"
                                    className="mt-5 bg-blue-700 text-sm px-6 py-2 rounded-lg text-white"
                                >
                                    Add Product
                                </button>
                            </div>
                        )}
                        <PrimaryButton className="mt-5" disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

export default Edit;
