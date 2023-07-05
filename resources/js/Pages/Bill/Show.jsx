import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import {Head, Link} from '@inertiajs/react'

function Show({bill}) {
    console.log(bill)
    return (
        <AppLayout>
            <Head title='Customers'/>
            <div className="mt-5 p-5 bg-white">
                <p className='text-[1.5rem] font-bold'>
                    Bill: {
                    bill.bill_id
                } </p>
                <div>
                    <p>Name: {
                        bill.customer.full_name
                    }</p>
                    <p>Number: {
                        bill.customer.mobile_number
                    }</p>
                    <p>Company: {
                        bill.customer.company
                    }</p>
                    <p>Estimated Total: {
                        bill.estimated_amount
                    }</p>
                    <p>Final Total: {
                        bill.final_amount
                    }</p>
                </div>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 overflow-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200 overflow-auto">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Estimated Quantity 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Feet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimated amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Bill Quantity 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Feet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Inches
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill Total Kgs
                                </th>
                                <th scope="col" className="px-6 py-3">
                                   Price Per Kg 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Bill amount
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            bill.bill_products ?. map((product, key) => {
                                return <tr key={key}
                                    className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        product.product_name
                                    } </th>
                                    <td className="px-6 py-4">
                                        {
                                        product.estimated_quantity
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.estimated_feets
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.estimated_inches
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.estimated_kgs
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.estimated_total_kgs
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        {
                                        product.estimated_amount
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.final_quantity
                                    } </td>

                                    <td className="px-6 py-4">
                                        {
                                        product.final_feets
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.final_inches
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.final_kgs
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.final_total_kgs
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        product.price_per_kg
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        {
                                        product.final_amount
                                    } </td>
                                </tr>
                        })
                        } </tbody>
                    </table>
                </div>

                <div className="flex justify-center">
                    <Link href={route('bill.invoice',{bill:bill})} className='block mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg'>Invoice</Link>
                </div>
            </div>
        </AppLayout>
    )
}

export default Show
