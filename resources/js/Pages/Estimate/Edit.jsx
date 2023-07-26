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

function Edit({products, estimate}) {

    console.log(estimate)

    const [customer, setCusomter] = useState(estimate.customer);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({customer: estimate.customer.id, products: estimate.estimate_products});


    const handleProductSelect = (event, index) => {
        let product = JSON.parse(event.target.value)
        let products = [...data.products]
        products[index][event.target.name] = product
        setData('products', products)
    }

    const handleFormChange = (event, index) => {
        let products = [...data.products]
        products[index][event.target.name] = event.target.value
        setData('products', products)
    }

    const addProduct = () => {
        let object = {
            product: '',
            unit: '',
            feet: '',
            inches: '',
            kgs: ''
        }

        setData('products', [
            ...data.products,
            object
        ])
    }


    const getCustomer = (event) => {
        setData('customer', event.value)
        axios.get(route('customer.get', {customer: event.value})).then((res) => {
            setCusomter(res.data)
        })
    }

    const submit = (e) => {
        e.preventDefault();
        post(route('estimate.update',{estimate:estimate}));
    }
    return (
        <AppLayout>
            <Head title='Create Estimate'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Edit Estimate
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

                                    <div className="mt-4">
                                        <InputLabel htmlFor="product" value="Color:"/>
                                        <p>{
                                            productSelected.color
                                        }</p>
                                    </div>

                                    <div className="mt-4">
                                        <InputLabel htmlFor="quantity" value="Quantity"/>

                                        <TextInput id="quantity" type="number" name="quantity"
                                            value={
                                                productSelected.quantity
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>

                                        <InputError message={
                                                errors.feet
                                            }
                                            className="mt-2"/>
                                    </div>


                                    {
                                    productSelected.unit_selected === 'Feet' && <div className="mt-4">
                                        <InputLabel htmlFor="feet" value="Feet"/>

                                        <TextInput id="feet" type="number" name="feet"
                                            value={
                                                productSelected.feets
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>

                                        <InputError message={
                                                errors.feet
                                            }
                                            className="mt-2"/>
                                    </div>
                                }
                                    {
                                    (productSelected.unit_selected === 'Feet' || productSelected.unit_selected === 'Inches') && <div className="mt-4">
                                        <InputLabel htmlFor="inches" value="Inches"/>

                                        <TextInput id="inches" type="number" name="inches"
                                            value={
                                                productSelected.inches
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>

                                        <InputError message={
                                                errors.inches
                                            }
                                            className="mt-2"/>
                                    </div>
                                }
                                    {
                                    productSelected.unit_selected === 'Kgs' && <div className="mt-4">
                                        <InputLabel htmlFor="kgs" value="Kgs"/>

                                        <TextInput id="kgs" type="number" name="kgs"
                                            value={
                                                productSelected.kgs
                                            }
                                            className="mt-1 block w-full"
                                            onChange={
                                                (e) => {
                                                    handleFormChange(e, index)
                                                }
                                            }
                                            required/>

                                        <InputError message={
                                                errors.kgs
                                            }
                                            className="mt-2"/>
                                    </div>
                                } </div>
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
