import React, {useState} from 'react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import {Head, Link, useForm} from '@inertiajs/react'
import Select from 'react-select'
import axios from 'axios';

function Edit({bill}) {

    console.log(bill)

    const [customer, setCusomter] = useState(bill.customer);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({customer: bill.customer.id, products: bill.bill_products});

    const handleFormChange = (event, index) => {
        let products = [...data.products]
        products[index][event.target.name] = event.target.value
        setData('products', products)
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('bill.updateWeight', {bill: bill}));
    }
    return (
        <AppLayout>
            <Head title='Create Estimate'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Edit Bill Weight
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            {
                            customer && <table className='w-full mt-2'>
                                <thead>
                                    <tr>
                                        <th className='border border-black'>Name</th>
                                        <th className='border border-black'>Number</th>
                                        <th className='border border-black'>Company</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='border border-black'>
                                            {
                                            customer ?. full_name
                                        }</td>
                                        <td className='border border-black'>
                                            {
                                            customer ?. mobile_number
                                        }</td>

                                        <td className='border border-black'>
                                            {
                                            customer ?. company
                                        }</td>
                                    </tr>
                                </tbody>
                            </table>
                        } </div>

                        {
                        customer && data.products.map((productSelected, index) => {
                            return (

                                <div key={index}>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="product" value="Product Name:"/>
                                        <p>{
                                            productSelected.product_name
                                        }</p>
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="product" value="Unit Selected:"/>
                                        <p>{
                                            productSelected.unit_selected
                                        }</p>
                                    </div>

                                    {productSelected.unit_selected !== 'Unit' && <div className="mt-4">
                                        <InputLabel htmlFor="price_per_kg" value="Pricer Per Kg"/>

                                        <TextInput id="price_per_kg" type="number" name="price_per_kg"
                                            value={
                                                productSelected.price_per_kg
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>

                                    </div>}

                                    {productSelected.unit_selected !== 'Unit' && <div className="mt-4">
                                        <InputLabel htmlFor="total_weight" value="Total Weight"/>

                                        <TextInput id="discount" type="number" step="0.01" name="final_total_kgs"
                                            value={
                                                productSelected.final_total_kgs
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>
                                    </div>}


                                </div>
                            )
                        })
                    }
                        <PrimaryButton className="mt-5"
                            disabled={processing}>
                            Submit
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}

export default Edit;
