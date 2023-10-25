import React from "react";
import AppLayout from "@/Layouts/AppLayout";

function Index({
    productsCount,
    customersCount,
    estimatesCount,
    billsCount,
    crimpingCharges,
    loadingCharges,
    transportCharges,
}) {
    return (
        <AppLayout>
            <div className="flex bg-gray-100 min-h-screen">
                <div className="flex-grow text-gray-800">
                    <main className="p-6 sm:p-10 space-y-6">
                        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                            <div className="mr-6">
                                <h1 className="text-4xl font-semibold mb-2">
                                    Dashboard
                                </h1>
                            </div>
                        </div>
                        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="block text-2xl font-bold">
                                        {productsCount}
                                    </span>
                                    <span className="block text-gray-500">
                                        Products
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="block text-2xl font-bold">
                                        {customersCount}
                                    </span>
                                    <span className="block text-gray-500">
                                        Customers
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="inline-block text-2xl font-bold">
                                        {estimatesCount}
                                    </span>
                                    <span className="block text-gray-500">
                                        Estimates{" "}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="block text-2xl font-bold">
                                        {billsCount}
                                    </span>
                                    <span className="block text-gray-500">
                                        Bills
                                    </span>
                                </div>
                            </div>
                        </section>
                        <div className="mt-[5rem] flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                            <div className="mr-6">
                                <h1 className="text-4xl font-semibold mb-2">
                                    Total Charges
                                </h1>
                            </div>
                        </div>
                        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="block text-2xl font-bold">
                                        {crimpingCharges}
                                    </span>
                                    <span className="block text-gray-500">
                                        Crimping Charges
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="block text-2xl font-bold">
                                        {loadingCharges}
                                    </span>
                                    <span className="block text-gray-500">
                                        Loading Charges
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-8 bg-white shadow rounded-lg">
                                <div>
                                    <span className="inline-block text-2xl font-bold">
                                        {transportCharges}
                                    </span>
                                    <span className="block text-gray-500">
                                        Transport Charges
                                    </span>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </AppLayout>
    );
}

export default Index;
