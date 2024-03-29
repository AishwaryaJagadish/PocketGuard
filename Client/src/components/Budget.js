import React, { Fragment, useState, useRef, useEffect } from 'react'
import {
    CurrencyRupeeIcon
} from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import Navbar from './Navbar'
import Expenses from './Expenses'
import { useDispatch, useSelector } from 'react-redux'
import { getAllExpenses, updateBudget } from '../redux/actions'


function Budget() {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const [carPrediction, setCarPrediction] = useState(false)
    const[carYear, setCarYear] = useState(null)
    const [presentPrice, setPresentPrice] = useState(null)
    const [kmsDriven, setKmsDriven] = useState(null)
    const [fuelType, setFuelType] = useState(null)
    const [seller, setSeller] = useState(null)
    const [transmission, setTransmission] = useState(null)
    const [owner, setOwner] = useState(null)
    
    // const [expense, setExpense] = useState(0)


    const dispatch = useDispatch();

    const user = useSelector(state => state.expenses.user)
    const expenses = useSelector(state => state.expenses.expenses)
    const expense = useSelector(state => state.expenses.totalExpenses)

    const [budget, setBudget] = useState(user.budget)

    const onUpdateBudget = (e) => {
        setOpen(false)
        dispatch(updateBudget(budget))
    }

    const onCarPrediction = (e) => {
        setCarPrediction(false)
    }

    useEffect(() => {
        dispatch(getAllExpenses())
    }, [])

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl px-2 py-8 sm:px-6 lg:px-8">
                <div className="items-center justify-between md:flex  md:grid-cols-2 ">
                    <div className="w-1/3 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
                        <div className="md:flex justify-between items-center">
                            <h2 className="text-2xl font-semibold mb-2">Budget</h2>
                            <button className=" bg-500 bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-xs md:text-sm font-medium " onClick={() => { setOpen(true) }}>
                                Update Budget
                            </button>
                        </div>
                        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                                <CurrencyRupeeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                {budget}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-semibold mb-2">Remaining Budget</h2>
                        </div>
                        <div className="relative pt-1">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                <div style={{ width: `${(expense / budget) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
                            </div>
                        </div>
                        <div className=" flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                            <div className=" flex items-center text-sm text-gray-500">
                                <CurrencyRupeeIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                {budget - expense}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                                                    Budget Update
                                                </Dialog.Title>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <span className="text-gray-500 sm:text-sm">₹</span>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Enter Your Budget"
                                                        onChange={(e) => setBudget(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => onUpdateBudget(e)}
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
            <Transition.Root show={carPrediction} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setCarPrediction}>
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
                                                    Car Price Prediction
                                                </Dialog.Title>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Year"
                                                        onChange={(e) => setCarYear(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Present Price"
                                                        onChange={(e) => setPresentPrice(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Kms Driven"
                                                        onChange={(e) => setKmsDriven(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Fuel Type"
                                                        onChange={(e) => setFuelType(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Seller"
                                                        onChange={(e) => setSeller(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Transmission"
                                                        onChange={(e) => setTransmission(e.target.value)}
                                                    />
                                                </div>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <input
                                                        type="text"
                                                        name="year"
                                                        id="year"
                                                        className="block w-full rounded-md py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="Owner"
                                                        onChange={(e) => setOwner(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                                            onClick={(e) => onCarPrediction(e)}
                                        >
                                            Predict
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setCarPrediction(false)}
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
            {
                expenses.length > 0 ? (
                    <Expenses expenses={expenses} />) : null
            }
            <div className="md:flex mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold mb-2">Predictions</h2>
            </div>
            <div className="md:flex mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
                <div className="w-1/3 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4">
                    <div className="md justify-between items-center">
                        <h2 className="text-2xl font-semibold mb-2">Car Price Prediction</h2>
                        <p className='py-2'>Our car price prediction API utilizes advanced machine learning models to provide real-time and accurate predictions of car prices based on key attributes, empowering users with valuable insights for their automotive decisions.</p>
                        <button className=" bg-500 bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-xs md:text-sm font-medium " onClick={() => { setCarPrediction(true) }}>
                            Predict
                        </button>
                    </div>
                </div>
                <div className="w-1/12"></div>
                <div className="w-1/3 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4 mb-2">
                    <div className="md justify-between items-center">
                        <h2 className="text-2xl font-semibold mb-2">Gold Prediction</h2>
                        <p className='py-2'>Our gold price prediction API leverages cutting-edge machine learning models to deliver up-to-the-minute forecasts of gold prices, offering users valuable insights for informed investment decisions in the precious metals market.</p>
                        <button className=" bg-500 bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-xs md:text-sm font-medium " onClick={() => { setCarPrediction(true) }}>
                            Predict
                        </button>
                    </div>
                </div>
                <div className="w-1/12"></div>
                <div className="w-1/3 flex flex-col justify-between bg-white rounded-lg border border-gray-400 mb-6 py-5 px-4 mb-2">
                    <div className="md justify-between items-center">
                        <h2 className="text-2xl font-semibold mb-2">Loan Prediction</h2>
                        <p className='py-2'>Our loan prediction API harnesses advanced machine learning algorithms to provide real-time predictions of loan approval, assisting users in making informed financial decisions with confidence.</p>
                        <button className=" bg-500 bg-blue-600 hover:bg-blue-500 text-white rounded-md px-3 py-2 text-xs md:text-sm font-medium " onClick={() => { setCarPrediction(true) }}>
                            Predict
                        </button>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Budget