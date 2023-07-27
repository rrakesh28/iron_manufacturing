import React from 'react'
import AppLayout from '@/Layouts/AppLayout'
import {Head, Link} from '@inertiajs/react'
import axios from 'axios'

function Index({estimates}) {
    // console.log(estimates)
    const handleDelete = (event, estimate) => {
        event.preventDefault();

        if (confirm('Are you sure you want to delete this estimate?')) {
            axios.post(route('estimate.destroy',{estimate:estimate})).then((res)=>{
                window.location.reload()
            })
        }
    }

    return (
        <AppLayout>
            <Head title='Customers'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Estimates
                </p>
                <Link href={
                        route('estimate.create')
                    }
                    className='bg-blue-700 text-sm px-6 py-2 rounded-lg text-white'>Create</Link>
            </div>
            <div className='mt-10 px-[2rem]'>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                            <tr>
                                 <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Estimate Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Full Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Total Amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            estimates ?. map((estimate, key) => {
                                return <tr key={key}
                                    className="bg-white border-b ">
                                         <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        estimate.created_at.slice(0,10)
                                    } </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        estimate.estimate_id
                                    } </th>
                                    <td className="px-6 py-4">
                                        {
                                        estimate.customer.full_name
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        estimate.customer.mobile_number
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        estimate.amount
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        <Link href={
                                                route('estimate.show', {estimate: estimate})
                                            }
                                            className='text-blue-600 hover:underline'>Show</Link>
                                        <Link href={
                                                route('estimate.convert.create', {estimate: estimate})
                                            }
                                            className='text-blue-600 hover:underline'>Convert</Link>
                                        <Link href={
                                                route('estimate.edit', {estimate: estimate})
                                            }
                                            className='text-blue-600 hover:underline'>Edit</Link>
                                        <button href={
                                                route('estimate.destroy', {estimate: estimate})
                                            }
                                            method='post'
                                            onClick={
                                                (e) => {
                                                    handleDelete(e, estimate)
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
