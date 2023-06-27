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
        full_name: '',
        mobile_number: '',
        email: '',
        company: '',
        address: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('customer.store'));
    }
    return (
        <AppLayout>
            <Head title='Create Customer'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Create Customer
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <InputLabel htmlFor="full_name" value="Full Name"/>

                            <TextInput id="full_name" type="text" name="full_name"
                                value={
                                    data.full_name
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('full_name', e.target.value)
                                }
                                required/>
                            <InputError message={
                                    errors.full_name
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="mobile_number" value="Mobile Number"/>

                            <TextInput id="mobile_number" type="number" name="mobile_number"
                                value={
                                    data.mobile_number
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('mobile_number', e.target.value)
                                }
                                required/>
                            <InputError message={
                                    errors.mobile_number
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="email" value="Email"/>

                            <TextInput id="email" type="email" name="email"
                                value={
                                    data.email
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => setData('email', e.target.value)
                                }/>
                            <InputError message={
                                    errors.email
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
                                    errors.company
                                }
                                className="mt-2"/>
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="address" value="Address"/>

                            <TextInput id="address" type="text" name="address"
                                value={
                                    data.address
                                }
                                className="mt-1 block w-full"
                                onChange={
                                    (e) => {
                                        setData('address', e.target.value)
                                    }
                                }
                                required/>

                            <InputError message={
                                    errors.address
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
