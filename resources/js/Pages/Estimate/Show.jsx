

import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import {Head, Link} from '@inertiajs/react'

function Show({estimate}) {

   console.log(estimate) 
    return (
        <AppLayout>
            <Head title='Customers'/>
            <div className="mt-5 p-5 bg-white">
                <p className='text-[1.5rem] font-bold'>
                    Estimate: {estimate.estimate_id}
                </p>
                <div>
                    <p>Name: {estimate.customer.full_name}</p>
                    <p>Number: {estimate.customer.mobile_number}</p>
                    <p>Company: {estimate.customer.company}</p>
                    <p>Total: {estimate.total_amount}</p>
                </div>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                   Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Quantity
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Feet 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Loading Charges 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Price Per Kg 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Discount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Final Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            estimate.estimate_products ?. map((product, key) => {
                                return <tr key={key}
                                    className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        product.product_name
                                    } </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        product.quantity
                                    } </th>
                                    <td className="px-6 py-4">
                                        {
                                        product.feets
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.inches
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.kgs
                                    } </td>
                                     <td className="px-6 py-4">
                                        {
                                        product.total_kgs
                                    } </td>
                                     <td className="px-6 py-4">
                                        {
                                        product.loading_charges
                                    } </td>
                                     <td className="px-6 py-4">
                                        {
                                        product.price_per_kg
                                    } </td>
                                     <td className="px-6 py-4">
                                        {
                                        product.amount
                                    } </td>
                                     <td className="px-6 py-4">
                                        {
                                        product.discount
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                       {product.final_amount}
                                    </td>
                                </tr>
                        })
                        } </tbody>
                    </table>
                </div>

                <div className="flex justify-center">
                    <Link href={route('estimate.invoice',{estimate:estimate})} className='block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg'>Invoice</Link>
                </div>

            </div>
        </AppLayout>
    )
}

export default Show
