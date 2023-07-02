

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
                                    Feet 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    amount
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
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                       {product.amount}
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

export default Show
