import React from 'react'
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
        product_name: '',
        unit_type: 'Feet',
        in_kgs: '',
        price_per_kg: '',
        price_per_unit: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('product.store'));
    }
    return (
        <AppLayout>
            <Head title='Create Product'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Create Product
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="product_name" value="Product Name"/>

                            <TextInput id="product_name" type="text" name="product_name"
                                value={
                                    data.product_name
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('product_name', e.target.value)
                                }
                                required/>
                            <InputError message={
                                    errors.product_name
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="unit_type" value="Unit Type"/>

                            <div className="flex gap-4">
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name="unit_type" id="unit_type" value="Feet"
                                        checked={
                                            data.unit_type === "Feet"
                                        }
                                        onChange={
                                            (e) => {
                                                setData('unit_type', e.target.value)
                                            }
                                        }
                                        required/>
                                    <span>Feet</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name="unit_type" id="unit_type" value="Kgs"
                                        checked={
                                            data.unit_type === "Kgs"
                                        }
                                        onChange={
                                            (e) => {
                                                setData('unit_type', e.target.value)
                                            }
                                        }
                                        required/>
                                    <span>Kgs</span>
                                </div>
                                <div className='flex gap-2 items-center'>
                                    <input type="radio" name="unit_type" id="unit_type" value="Unit"
                                        checked={
                                            data.unit_type === "Unit"
                                        }
                                        onChange={
                                            (e) => {
                                                setData('unit_type', e.target.value)
                                            }
                                        }
                                        required/>
                                    <span>Unit</span>
                                </div>
                            </div>

                            <InputError message={
                                    errors.unit_type
                                }
                                className="mt-2"/>
                        </div>
                        {
                        data.unit_type === 'Feet' && <div className="mt-4">
                            <InputLabel htmlFor="in_kgs" value="In Kgs"/>

                            <TextInput id="in_kgs" type="number" name="in_kgs"
                                value={
                                    data.in_kgs
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('in_kgs', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.in_kgs
                                }
                                className="mt-2"/>
                        </div>
                    }

                        {
                        data.unit_type === 'Unit' && <div className="mt-4">
                            <InputLabel htmlFor="price_per_unit" value="Pricer Per Unit"/>

                            <TextInput id="price_per_unit" type="number" name="price_per_unit"
                                value={
                                    data.price_per_unit
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('price_per_unit', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.in_kgs
                                }
                                className="mt-2"/>
                        </div>
                    }
                        {
                        (data.unit_type === 'Feet' || data.unit_type === 'Kgs') && <div className="mt-4">
                            <InputLabel htmlFor="price_per_kg" value="Price Per Kg"/>

                            <TextInput id="price_per_kg" type="number" name="price_per_kg"
                                value={
                                    data.price_per_kg
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => {
                                        setData('price_per_kg', e.target.value)
                                    }
                                }
                                required/>

                            <InputError message={
                                    errors.price_per_kg
                                }
                                className="mt-2"/>
                        </div>
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

export default Create;
