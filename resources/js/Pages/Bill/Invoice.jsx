
import React, { useEffect } from 'react'

function Invoice({bill}) {
    useEffect(()=>{
        window.print();
    },[])
    return (
        <div className='p-5'>
            <div>

                <div className="flex justify-center">
                    <p>Bill Copy</p>
                </div>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-10'>
                    <div className="flex gap-4">
                        <div>
                            <p>
                                <span>Bill: {
                                    bill.bill_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>Customer Details:</p>
                        <p className="font-bold">
                            {
                            bill.customer.full_name
                        }</p>
                        <p>Ph: {
                            bill.customer.mobile_number
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
                            bill.bill_products.map((product) => {
                                return <tr className='border-b border-black'>
                                    <td className='text-center'>
                                        {
                                        product.product_name
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_quantity
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_feets
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_inches
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_total_kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.price_per_kg
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_loading_charges
                                    }</td>
                                    <th className='text-center'>
                                        {
                                        product.final_amount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.final_discount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.final_total_amount
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
                                    bill.final_amount
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mt-10'>

                <div className="flex justify-center">
                    <p>Original Copy</p>
                </div>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-10'>
                    <div className="flex gap-4">
                        <div>
                            <p>
                                <span>Bill: {
                                    bill.bill_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <p>Customer Details:</p>
                        <p className="font-bold">
                            {
                            bill.customer.full_name
                        }</p>
                        <p>Ph: {
                            bill.customer.mobile_number
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
                            bill.bill_products.map((product) => {
                                return <tr className='border-b border-black'>
                                    <td className='text-center'>
                                        {
                                        product.product_name
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_quantity
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_feets
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_inches
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_total_kgs
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.price_per_kg
                                    }</td>
                                    <td className='text-center'>
                                        {
                                        product.final_loading_charges
                                    }</td>
                                    <th className='text-center'>
                                        {
                                        product.final_amount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.final_discount
                                    }</th>
                                    <th className='text-center'>
                                        {
                                        product.final_total_amount
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
                                    bill.final_amount
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>            </div>

        </div>
    )
}

export default Invoice
