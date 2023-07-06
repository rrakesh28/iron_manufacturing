import React, {useEffect, useState} from 'react'

function Invoice({estimate}) {
    const [date, setDate] = useState(null)
    useEffect(() => {
        const date = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
        setDate(date)
        // window.print();
    }, [])
    return (
        <div className='p-5'>
            <div>

                <div className="flex justify-center">
                    <p>Estimate Copy</p>
                </div>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-10'>
                    <div className="flex gap-4">
                        <div>
                            <p>Invoice Date: {date}</p>
                            <p>
                                <span>Estimate: {
                                    estimate.estimate_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div>
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
                                <th>Quantity</th>
                                <th>Feets</th>
                                <th>Inches</th>
                                <th>Kgs</th>
                                <th>Total Kgs</th>
                                <th>Price Per Kgs</th>
                                <th>Loading Charges</th>
                                <th>Amount</th>
                                <th>Discount</th>
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
                                    <th className='text-center'>
                                        {
                                        product.loading_charges
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.amount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.discount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.final_amount
                                    }</th>
                                </tr>
                        })
                        }
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
                                    estimate.total_amount
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
