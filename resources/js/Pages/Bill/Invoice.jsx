import React, {useEffect, useState} from 'react'
import './print.css';
function Invoice({bill}) {
    useEffect(() => { 
        window.print();
    }, [])
    return (
        <div className='p-5'>
            <div>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-2'>
                    <div className="flex gap-4">
                        <div>
                            <p>Date:{
                                bill.created_at.slice(0, 10)
                            }</p>
                            <p>
                                <span>Bill: BIL{
                                    bill.bill_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
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
                            <tr className='border-b border-t border-black mt-[-5px]'>
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
                            bill.bill_products.map((product) => {
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
                                        product.price_per_unit
                                    }</td>
                                    <th className='text-center'>
                                        {
                                        product.final_total_amount
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
                                    bill.final_total_kgs
                                }</td>
                                <td></td>
                                <td className='text-center font-bold'>Loading Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_loading_charges
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
                                <td className='text-center font-bold'>Transport Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_transport_charges
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
                                <td className='text-center font-bold'>Crimping Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_crimping_charges
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
                                <td className='text-center font-bold'>Discount</td>
                                <td className='text-center'>
                                    {
                                    bill.final_discount
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
                                <td className='text-center font-bold'>Total</td>
                                <td className='text-center'>
                                    {
                                    bill.amount
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mt-10'>
                <div>
                    <p>INVOICE</p>
                    <p>HMT</p>
                </div>

                <div className='mt-2'>
                    <div className="flex gap-4">
                        <div>
                            <p>Date:{
                                bill.created_at.slice(0, 10)
                            }</p>
                            <p>
                                <span>Bill: {
                                    bill.bill_id
                                }</span>
                            </p>
                        </div>
                    </div>
                    <div className='flex gap-2'>
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
                            bill.bill_products.map((product) => {
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
                                        product.price_per_unit
                                    }</td>
                                    <th className='text-center'>
                                        {
                                        product.final_total_amount
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
                                    bill.final_total_kgs
                                }</td>
                                <td></td>
                                <td className='text-center font-bold'>Loading Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_loading_charges
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
                                <td className='text-center font-bold'>Transport Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_transport_charges
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
                                <td className='text-center font-bold'>Crimping Charges</td>
                                <td className='text-center'>
                                    {
                                    bill.final_crimping_charges
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
                                <td className='text-center font-bold'>Discount</td>
                                <td className='text-center'>
                                    {
                                    bill.final_discount
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
                                <td className='text-center font-bold'>Total</td>
                                <td className='text-center'>
                                    {
                                    bill.amount
                                }</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Invoice
