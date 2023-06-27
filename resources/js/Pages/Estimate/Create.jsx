import React, {useState} from 'react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react'

function Create() {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        customer: '',
        product: '',
        unit: '',
        feet: '',
        inches: '',
        kgs: ''
    });

    const [showModal,setShowModal] = useState(false)

    const submit = (e) => {
        e.preventDefault();
        post(route('customer.store'));
    }
    return (
        <AppLayout>
            <Head title='Create Customer'/>
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

                            <select name="customer" id="customer" className='w-full border border-gray-200 rounded-lg'>
                                <option value="" selected disabled>Select Customer</option>
                                <option value="">Rakesh</option>
                                <option value="">Rakesh</option>
                                <option value="">Rakesh</option>
                            </select>

                            <InputError message={
                                    errors.customer
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <button onClick={(e)=>{setShowModal(true)}}
                                className='mt-5 bg-blue-700 text-sm px-6 py-2 rounded-lg text-white'>Create Customer</button>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="product" value="Product"/>

                            <select name="customer" id="customer" className='w-full border border-gray-200 rounded-lg'>
                                <option value="" selected disabled>Select Product</option>
                                <option value="">Product 1</option>
                                <option value="">Product 2</option>
                                <option value="">Product 3</option>
                            </select>

                            <InputError message={
                                    errors.product
                                }
                                className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unit" value="Unit"/>

                            <div className="flex gap-4 flex-wrap">
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="" id=""/>
                                    <span>Feet</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="" id=""/>
                                    <span>Inches</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" name="" id=""/>
                                    <span>Kgs</span>
                                </div>
                            </div>

                            <InputError message={
                                    errors.unit
                                }
                                className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="feet" value="Feet"/>

                            <TextInput id="feet" type="number" name="feet"
                                value={
                                    data.feet
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => {
                                        setData('feet', e.target.value)
                                    }
                                }
                                required/>

                            <InputError message={
                                    errors.feet
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="inches" value="Inches"/>

                            <TextInput id="inches" type="number" name="inches"
                                value={
                                    data.inches
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => {
                                        setData('inches', e.target.value)
                                    }
                                }
                                required/>

                            <InputError message={
                                    errors.inches
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="kgs" value="Kgs"/>

                            <TextInput id="kgs" type="number" name="kgs"
                                value={
                                    data.kgs
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => {
                                        setData('kgs', e.target.value)
                                    }
                                }
                                required/>

                            <InputError message={
                                    errors.kgs
                                }
                                className="mt-2"/>
                        </div>
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
