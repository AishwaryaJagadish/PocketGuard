import React, { Fragment, useRef, useState } from 'react'
import { Dialog, Disclosure,  Transition } from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { deleteExpense, updateExpense } from '../redux/actions';


function Expenses(props) {

    const [open, setOpen] = useState(false)
    const [expenseAmount, setExpenseAmount] = useState(0)
    const [expenseName, setExpenseName] = useState("")
    const [expenseId, setExpenseId] = useState("")
  
    const cancelButtonRef = useRef(null)
    const dispatch = useDispatch();

    const { expenses } = props;

    const onDeleteExpense = (expense) => {
        console.log("Delete")
        dispatch(deleteExpense(expense._id))
    }

    const onUpdateExpense = () => {
        setOpen(false)
        const expense = {
            "name": expenseName,
            "amount": expenseAmount
        }
        console.log("Update")
        dispatch(updateExpense(expenseId , expense))
    }

    return (
        <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-2">Recent Expenses</h2>
            <table className="min-w-full divide-y divide-gray-200 rounded-lg border border-gray-400">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left rounded-md px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wider">
                            #
                        </th>
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
                    {
                        expenses.map((expense, index) => {
                            return (
                                <tr key={index}>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-4 whitespace-nowrap">
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{expense.name}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">₹ {expense.amount}</div>
                                    </td>
                                    <td className="py-4 whitespace-nowrap">
                                        <div class="flex gap-4">
                                            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600" onClick={() => {setOpen(true)
                                            setExpenseId(expense._id) }}>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 5.828a2 2 0 00-2.828 0L5.172 13.172a2 2 0 00-.485.828l-1.172 4.686a1 1 0 001.313 1.313l4.686-1.172a2 2 0 00.828-.485l7.344-7.344a2 2 0 000-2.828z"></path>
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 2l4 4"></path>
                                                </svg>
                                            </button>
                                            <button className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600" onClick={() => onDeleteExpense(expense)}>
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Update Expense
                                                </Dialog.Title>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        className="block w-full rounded-md py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter Name"
                                                        onChange={(e) => setExpenseName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter Amount"
                                                        onChange={(e) => setExpenseAmount(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            onClick={() => onUpdateExpense()}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default Expenses