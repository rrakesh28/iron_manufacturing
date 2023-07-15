import React from 'react'
import PurchasesLayout from '@/Layouts/PurchasesLayout';
import {Head, Link} from '@inertiajs/react'

function Index({inventory}) {

    const handleDelete = (event, inventory) => {
        event.preventDefault();

        if (confirm('Are you sure you want to delete this inventory?')) {
            axios.post(route('inventory.destroy', {inventory: inventory})).then((res) => {
                window.location.reload()
            })
        }
    }
    return (
        <PurchasesLayout>
            <Head title='Inventory'/>
            <div className="mt-5 px-5">
                <p className='text-[1.5rem] font-bold'>
                    Inventory
                </p>
                <Link href={
                        route('inventory.create')
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
                                    Coil Code
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Weight
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Thickeness
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Grade
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Cost
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody> {
                            inventory ?. map((item, key) => {
                                return <tr key={key}
                                    className="bg-white border-b ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        item.created_at.slice(0, 10)
                                    } </th>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                        {
                                        item.coil_code
                                    } </th>
                                    <td className="px-6 py-4">
                                        {
                                        item.weight
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        item.thickness
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        item.color
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        item.grade
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        item.company
                                    } </td>
                                    <td className="px-6 py-4">
                                        {
                                        item.cost
                                    } </td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        <Link href={
                                                route('inventory.show', {inventory: item})
                                            }
                                            className='text-blue-600 hover:underline'>Show</Link>
                                        <Link href={
                                                route('inventory.edit', {inventory: item})
                                            }
                                            className='text-blue-600 hover:underline'>Edit</Link>
                                        <button href={
                                                route('inventory.destroy', {inventory: item})
                                            }
                                            method='post'
                                            onClick={
                                                (e) => {
                                                    handleDelete(e, item)
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
        </PurchasesLayout>
    )
}

export default Index
