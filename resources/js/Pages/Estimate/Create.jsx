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

function Create({products, customers}) {


    const [productsSelected, setProductsSelected] = useState([{
            product: '',
            unit: '',
            feet: '',
            inches: '',
            kgs: ''
        }])

    const [customer, setCusomter] = useState(null);
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({customer: '', products: ''});

    // const [products, setProducts] = useState({})

    const handleProductSelect = (event, index) => {
        let product = JSON.parse(event.target.value)
        let data = [...productsSelected]
        data[index][event.target.name] = product
        setProductsSelected(data)
    }

    const handleFormChange = (event, index) => {
        let data = [...productsSelected]
        data[index][event.target.name] = event.target.value
        setProductsSelected(data)
    }

    const addProduct = () => {
        let object = {
            product: '',
            unit: '',
            feet: '',
            inches: '',
            kgs: ''
        }

        setProductsSelected([
            ...productsSelected,
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
        console.log(productsSelected)
        setData('products',productsSelected)
        post(route('estimate.store'));
    }
    return (
        <AppLayout>
            <Head title='Create Estimate'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Create Estimate
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="customer" value="Customer"/>

                            <Select options={customers}
                                onChange={
                                    (e) => {
                                        getCustomer(e)
                                    }
                                }/>

                            <InputError message={
                                    errors.customer
                                }
                                className="mt-2"/> {
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
                        <div className="mt-5 flex justify-center">
                            <a href={
                                    route('customer.create')
                                }
                                target='_blank'
                                type='button'
                                onClick={
                                    (e) => {
                                        setShowModal(true)
                                    }
                                }
                                className='mt-5 bg-blue-700 text-sm px-6 py-2 rounded-lg text-white'>Create Customer</a>
                        </div>
                        {
                        customer && productsSelected.map((productSelected, index) => {
                            return (

                                <div key={index}>
                                    <div className="mt-4">
                                        <InputLabel htmlFor="product" value="Product"/>

                                        <select name="product" id="product" className='w-full border border-gray-200 rounded-lg'
                                            onChange={
                                                (e) => handleProductSelect(e, index)
                                        }>
                                            <option value="null" selected disabled>Select Product</option>
                                            {
                                            products.map((product, index) => {
                                                return (
                                                    <option key={index}
                                                        value={
                                                            JSON.stringify(product)
                                                    }>
                                                        {
                                                        product.name
                                                    } </option>
                                                )
                                            })
                                        } </select>

                                        <InputError message={
                                                errors.product
                                            }
                                            className="mt-2"/>
                                    </div>

                                    {
                                    productSelected.product && <div className="mt-4">
                                        <InputLabel htmlFor="unit" value="Unit"/>
                                        <div className="flex gap-4 flex-wrap">
                                            {
                                            productSelected.product.unit_type === 'Feet' && <div className='flex gap-4'>

                                                <div className="flex items-center gap-2">
                                                    <input type="radio" name="unit" id="unit" value='Feet'
                                                        onChange={
                                                            (e) => handleFormChange(e, index)
                                                        }/>
                                                    <span>Feet</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <input type="radio" name="unit" id="unit" value="Inches"
                                                        onChange={
                                                            (e) => handleFormChange(e, index)
                                                        }/>
                                                    <span>Inches</span>
                                                </div>
                                            </div>
                                        }
                                            {
                                            (productSelected.product.unit_type === 'Kgs' || productSelected.product.unit_type === 'Feet') && <div className="flex items-center gap-2">
                                                <input type="radio" name="unit" id="unit" value="Kgs"
                                                    onChange={
                                                        (e) => handleFormChange(e, index)
                                                    }/>
                                                <span>Kgs</span>
                                            </div>
                                        } </div>

                                        <InputError message={
                                                errors.unit
                                            }
                                            className="mt-2"/>
                                    </div>
                                }

                                    {
                                    productSelected.unit === 'Feet' && <div className="mt-4">
                                        <InputLabel htmlFor="feet" value="Feet"/>

                                        <TextInput id="feet" type="number" name="feet"
                                            value={
                                                productSelected.feet
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
                                    (productSelected.unit === 'Feet' || productSelected.unit === 'Inches') && <div className="mt-4">
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
                                    productSelected.unit === 'Kgs' && <div className="mt-4">
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
                        {customer && <div className="mt-5 flex justify-center">
                            <button onClick={
                                    (e) => {
                                        addProduct()
                                    }
                                }
                                type='button'
                                className='mt-5 bg-blue-700 text-sm px-6 py-2 rounded-lg text-white'>Add Product</button>
                        </div>}
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

export default Create;
