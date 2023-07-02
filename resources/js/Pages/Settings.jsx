import {useEffect} from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout'

function Index() {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset
    } = useForm({email: '', password: ''});

    useEffect(() => {
        return() => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('settings.update'));
    };
    return (
        <AppLayout>
            <Head title="Settings"/> {
        }

            <div className="flex justify-center">

                <form onSubmit={submit} className='bg-white p-5 w-[30rem] mt-10'>
                    <div>
                        <InputLabel htmlFor="email" value="Email"/>

                        <TextInput id="email" type="email" name="email"
                            value={
                                data.email
                            }
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={
                                (e) => setData('email', e.target.value)
                            } required/>

                        <InputError message={
                                errors.email
                            }
                            className="mt-2"/>
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password"/>

                        <TextInput id="password" type="password" name="password"
                            value={
                                data.password
                            }
                            className="mt-1 block w-full"
                            autoComplete="current-password"
                            onChange={
                                (e) => setData('password', e.target.value)
                            } required/>

                        <InputError message={
                                errors.password
                            }
                            className="mt-2"/>
                    </div>

                    <div className="flex items-center justify-end mt-4">

                        <PrimaryButton className="ml-4"
                            disabled={processing}>
                            Update
                        </PrimaryButton>
                    </div>
                </form>
            </div>

        </AppLayout>
    )
}

export default Index
