import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react'

function Create({products}) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        product_id:'',
        unit_type:'',
        weight:'',
        quantity:'',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('inventory.store'));
    }
    return (
        <AppLayout>
            <Head title='Create Product'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Create Inventory
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="Product" value="Product"/>

                            <select name="product" id="product" className='w-full border rounded-lg' onChange={(e)=>{setData('product_id',e.target.value)}}>
                                <option value="" selected disabled>Select a Product</option>
                                {products.map((product,index)=>{
                                    return <option value={product.id}>{product.name}</option>
                                })}
                            </select>

                            <InputError message={
                                    errors.product_id
                                }
                                className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="unit_type" value="Unit Type" />

                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    <input type="radio" value="Weight" name="unit_type" id="unit_type" onChange={(e)=>{setData('unit_type',e.target.value)}}/>
                                    <span>Weight</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="radio" value="Quantity" name="unit_type" id="unit_type" onChange={(e)=>{setData('unit_type',e.target.value)}} />
                                    <span>Quantity</span>
                                </div>
                            </div>

                            <InputError message={errors.unit_type} className='mt-2' />
                        </div>

                     
         
                        {data.unit_type === 'Weight' && <div className="mt-4">
                            <InputLabel htmlFor="weight" value="Weight"/>

                            <TextInput id="weight" type="number" name="weight"
                                value={
                                    data.cost
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('weight', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.weight
                                }
                                className="mt-2"/>
                        </div>}
                        
                        {data.unit_type === 'Quantity' && <div className="mt-4">
                            <InputLabel htmlFor="quanity" value="Quantity"/>

                            <TextInput id="quantity" type="number" name="cost"
                                value={
                                    data.quantity
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('quantity', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.quantity
                                }
                                className="mt-2"/>
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
