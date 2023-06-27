import React, {useState} from 'react'
import AppLayout from '@/Layouts/AppLayout'
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react'

function Create({products}) {


    const [product, setProduct] = useState(null)
    const [feet, setFeet] = useState(null);
    const [inches, setInches] = useState(null)
    const [kg, setKg] = useState(null)
    const [result,setResult] = useState(null)

    const submit = (e) => {
        e.preventDefault();
        axios.post(route('conversion.store', {
            product: product,
            feets: feet,
            inches: inches,
            kg: kg
        })).then((res) => {
            setResult(res.data)
        })
    }

    const storeProduct = (e) => {
        const selectedProductId = e.target.value;
        const productsArray = Object.values(products);
        const selectedProduct = productsArray.find(product => product.id == selectedProductId);
        setProduct(selectedProduct)
    }

    return (
        <AppLayout>
            <Head title='Create Product'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Manage Conversion
                </p>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="bg-white w-[30rem] p-[2rem]">
                    <div className="grid place-items-center">
                        <select name="product" id="product" className='border rounded-lg'
                            onChange={storeProduct}>
                            <option value="" selected disabled>Select Product
                            </option>
                            {
                            products.map((product, key) => {
                                return <option value={
                                        product.id
                                    }
                                    className='p-[1rem]'>
                                    {
                                    product.name
                                }</option>
                        })
                        } </select>
                    </div>

                    {
                    product && <div>
                        <form onSubmit={submit}>
                            {
                            product.unit_type === 'Feet' && <div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="feet" value="Feet"/>

                                    <TextInput id="feet" type="number" name="feet" className="mt-1 block w-full"
                                        onChange={
                                            (e) => setFeet(e.target.value)
                                        }
                                        required/>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="inches" value="Inches"/>

                                    <TextInput id="inches" type="number" name="inches" className="mt-1 block w-full"
                                        onChange={
                                            (e) => setInches(e.target.value)
                                        }
                                        required/>
                                </div>
                            </div>
                        }
                            {
                            product.unit_type === 'Kgs' && <div className="mt-4">
                                <InputLabel htmlFor="kgs" value="Kgs"/>

                                <TextInput id="Kgs" type="number" name="kgs" className="mt-1 block w-full"
                                    onChange={
                                        (e) => setKg(e.target.value)
                                    }
                                    required/>
                            </div>
                        }

                        <p className='mt-10'>{result}</p>
                            <PrimaryButton className="mt-5">
                                Submit
                            </PrimaryButton>
                        </form>
                    </div>
                } </div>
            </div>
        </AppLayout>
    )
}

export default Create;
