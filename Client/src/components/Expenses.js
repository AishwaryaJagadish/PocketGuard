import React from 'react'

function Expenses() {
    return (
        <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-2">Recent Expenses</h2>
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-400">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left rounded-md px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left rounded-md px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left rounded-md px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                        <td className=" py-4 whitespace-nowrap">
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">Shopping</div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">₹ 250</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button className="bg-red-600 hover:bg-red-500 text-white rounded-md px-3 py-2 text-sm font-medium">
                                Delete
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>


        </div>
    )
}

export default Expenses