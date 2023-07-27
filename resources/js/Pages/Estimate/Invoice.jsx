import React, {useEffect, useState} from 'react'

function Invoice({estimate}) {
    useEffect(() => { 
        // window.print();
    }, [])
    return (
        <div className='p-5'>
            <div>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-10'>
                    <div className="flex gap-4">
                        <div>
                            <p>Invoice Date: {
                                estimate.created_at.slice(0, 10)
                            }</p>
                            <p>
                                <span>Estimate: EST{
                                    estimate.estimate_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <p>Customer Details:</p>
                        <p className="font-bold">
                            {
                            estimate.customer.full_name
                        }</p>
                        <p>Ph: {
                            estimate.customer.mobile_number
                        }</p>
                    </div>
                </div>
                <div>
                    <table className='w-full'>
                        <thead>
                            <tr className='border-b border-t border-black'>
                                <th>Product</th>
                                <th>Color</th>
                                <th>Quantity</th>
                                <th>Feets</th>
                                <th>Inches</th>
                                <th>Kgs</th>
                                <th>Total Kgs</th>
                                <th>Price Per Kgs</th>
                                <th>Price Per Unit</th>
                                <th>Final Amount</th>
                            </tr>
                        </thead>
                        <tbody> {
                            estimate.estimate_products.map((product) => {
                                return <tr className='border-b border-black'>
                                    <td className='text-center'>
                                        {
                                        product.product_name
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.color
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.quantity
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.feets
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.inches
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.total_kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.price_per_kg
                                    }</td>

                                    <td className='text-center'>
                                        {
                                        product.price_per_unit
                                    }</td>
                                    <th className='text-center'>
                                        {
                                        product.amount
                                    }</th>
                                </tr>
                        })
                        }
                            <tr className='border-b border-black'>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'>Total Kgs</td>
                                <td className='text-center'>
                                    {
                                    estimate.total_kgs
                                }</td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'>Loading Charges</td>
                                <td className='text-center'>
                                    {
                                    estimate.loading_charges
                                }</td>
                            </tr>
                            <tr className='border-b border-black'>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'></td>
                                <td className='text-center'></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'>Crimping Charges</td>
                                <td className='text-center'>
                                    {
                                    estimate.crimping_charges
                                }</td>
                            </tr>
                            <tr className='border-b border-black'>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'></td>
                                <td className='text-center'></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'>Discount</td>
                                <td className='text-center'>
                                    {
                                    estimate.discount
                                }</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-center font-bold'>Total</td>
                                <td className='text-center'>
                                    {
                                    estimate.amount
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <p className='text-[1.5rem] font-bold'>Terms</p>
                    <p>This qutation is valid for 07 days from generation date.</p>
                    <p>The rates are subjected to final Weights after production.</p>
                    <p>If you have any questions about this purchase order, please contact</p>
                    <p>50% ADVANCE PAYMENT 50% PAYMENT BEFORE THE DISPATCH</p>
                    <p>Loading and bending charges extra</p>
                </div>
                <div>
                    <p className='text-[1.5rem] font-bold'>Bank Details:</p>
                    <p>ICIC KAZIPET BRANCH</p>
                    <p>A/C NO: 230305003166</p>
                    <p>IFSC CODE:- ICIC0002303</p>
                    <p>A/C NAME: HINDUSTHAN MANUFACTURES AND TRADERS</p>

                </div>
            </div>

        </div>
    )
}

export default Invoice
