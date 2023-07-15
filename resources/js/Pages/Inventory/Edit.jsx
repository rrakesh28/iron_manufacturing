import React from 'react'
import PurchasesLayout from '@/Layouts/PurchasesLayout'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react'

function Create({inventory}) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({
        coil_code: inventory.coil_code,
        weight: inventory.weight,
        thickness: inventory.thickness,
        color: inventory.color,
        grade: inventory.grade,
        company: inventory.company,
        cost: inventory.cost
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('inventory.update',{inventory:inventory}));
    }
    return (
        <PurchasesLayout>
            <Head title='Edit Inventory'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Edit Inventory
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="coil_code" value="Coil Code"/>

                            <TextInput id="coil_code" type="text" name="coil_code"
                                value={
                                    data.coil_code
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('coil_code', e.target.value)
                                }
                                required/>
                            <InputError message={
                                    errors.coil_code
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="weight" value="Weight"/>

                            <TextInput id="weight" type="number" name="weight"
                                value={
                                    data.weight
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
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="thickness" value="Thickness"/>

                            <TextInput id="thickness" type="number" name="thickness"
                                value={
                                    data.thickness
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('thickness', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.thickness
                                }
                                className="mt-2"/>
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="color" value="Color"/>

                            <TextInput id="color" type="text" name="color"
                                value={
                                    data.color
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('color', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.color
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="grade" value="Grade"/>

                            <TextInput id="grade" type="text" name="grade"
                                value={
                                    data.grade
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('grade', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.grade
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="company" value="Company"/>

                            <TextInput id="company" type="text" name="company"
                                value={
                                    data.company
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('company', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.color
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="cost" value="Cost"/>

                            <TextInput id="cost" type="number" name="cost"
                                value={
                                    data.cost
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('cost', e.target.value)
                                }
                                required/>

                            <InputError message={
                                    errors.cost
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
        </PurchasesLayout>
    )
}

export default Create;
