import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import {Head, Link} from '@inertiajs/react'

function Index({products}) {

    const handleDelete = (event, product) => {
        event.preventDefault();

        if (confirm('Are you sure you want to delete this estimate?')) {
            axios.post(route('product.destroy', {product: product})).then((res) => {
                window.location.reload()
            })
        }
    }
    return (
        <AppLayout>
            <Head title='Products'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Products
                </p>
                <Link href={
                        route('product.create')
                    }
                    className='bg-blue-700 text-sm px-6 py-2 rounded-lg text-white'>Create</Link>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Unit Type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    In Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Price (per k1.5)
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            products.map((product, key) => {
                                return <tr key={key}
                                    className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        product.name
                                    } </th>
                                    <td className="px-6 py-4">
                                        {
                                        product.unit_type
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.in_kgs
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.price_per_kg
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        <Link href={
                                                route('product.edit', {product: product})
                                            }
                                            className='text-blue-600 hover:underline'>Edit</Link>
                                        <button href={
                                                route('product.destroy', {product: product})
                                            }
                                            method='post'
                                            onClick={
                                                (e) => {
                                                    handleDelete(e, product)
                                                }
                                            }
                                            className='text-red-600 hover:underline'>Delete</button>
                                    </td>
                                </tr>
                        })
                        } </tbody>
                    </table>
                </div>

            </div>
        </AppLayout>
    )
}

export default Index
