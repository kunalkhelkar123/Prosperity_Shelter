import React, { useState } from 'react';



function Money_loan_calculator() {

    const [rvalue, setValue] = useState("0");

    const [loan, setloan] = useState("");
    const [loanerr, setloanaerr] = useState(false);

    const [percentageratio, setpercentage] = useState("");
    const [errper, seterrper] = useState(false);

    const [monthlyPayment, setMonthlyPayment] = useState(0);


    // const [reset, setreset]=useState("");

    const handlesubmit = (event) => {
        event.preventDefault();
    }

    // Range input
    const handlerange = (event) => {
        setValue(parseInt(event.target.value));
    };

    const loanerrhandler = (event) => {
        let item = event.target.value;
        if (/^\d*$/.test(item)) {
            setloanaerr(false);
        }// /^\d*$/.test(item) ? 
        else {
            setloanaerr(true);
        }

        setloan(item);
    }

    const percentagehandler = (event) => {
        let numratio = event.target.value;
        if (numratio === '' || (numratio >= 0 && numratio <= 100)) {
            seterrper(false);

        }
        else {
            seterrper(true);
        }
        setpercentage(numratio);
    }


    const rangehandler = (event) => {
        // contentclear=event.target.valuel
        // setreset(contentclear);
        setloan("");
        setpercentage("");
        setValue(0);
        setMonthlyPayment(0);
    }


    const calculate_amount = (event) => {



        if (!loanerr && !errper && loan !== "" && percentageratio !== "" && rvalue !== "" && loan && percentageratio && rvalue) {
            // monthlyPayment==0;
            // setMonthlyPayment(true);

            // Convert interest rate from percentage to decimal
            const monthlyInterestRate = parseFloat(percentageratio) / 100 / 12;

            // Convert loan term from years to months
            const numberOfPayments = parseFloat(rvalue) * 12;

            // Calculate monthly payment
            const monthlyPaymentValue = (parseFloat(loan) * monthlyInterestRate) /
                (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
            setMonthlyPayment(monthlyPaymentValue.toFixed(2)); // Round to two decimal places
            // return monthlyPaymentValue;
        }
        // if(monthlyPayment==NaN){
        //     return 0;
        // }
    }



    return (
        <>
            <div className="flex flex-col justify-center items-center ">
                <form onSubmit={handlesubmit} className="flex flex-col justify-center items-baseline h-[610px] sm:h-[580px] md:h-[600px] w-[260px] sm:w-[310px] bg-[#A900FF] p-[20px] gap-[10px] md:w-[260px] lg:w-[310px]">


                    <div className="flex flex-col gap-[12px]">
                        <div>
                            <p className='text-[24px]'><strong>Calculate Your Mortgage</strong></p>
                        </div>
                        <div>
                            <p>Calculate EMI Based On Your Interest Rate | Find out more on our loan EMI calculator here.</p>
                        </div>
                    </div>

                    {/* loan amount */}

                    <div className="flex flex-col gap-[5px]">
                        <div>
                            <p><strong>Loan Amount</strong></p>
                        </div>
                        <div>
                            <input type="text"
                                placeholder="Enter Your Loan Amount"
                                className="outline-none h-[35px] w-[225px] sm:h-[40px] sm:w-[270px] rounded-[7px] placeholder:pl-[20px] md:w-[230px] lg:w-[270px]"
                                onChange={loanerrhandler}
                                required
                                value={loan}
                            />
                        </div>
                        <div>{loanerr ? (<div className='text-red-900'><strong>Enter valid amount</strong></div>) : ""}</div>
                    </div>

                    {/* Percentage rate */}

                    <div className="flex flex-col gap-[5px]">
                        <div>
                            <p><strong>Percentage rate</strong></p>
                        </div>
                        <div>
                            <input type="text"
                                placeholder="Enter loan percentage ratio"
                                className="outline-none sm:h-[40px] sm:w-[270px] h-[35px] w-[225px] rounded-[7px] placeholder:pl-[20px] md:w-[230px] lg:w-[270px]"
                                onChange={percentagehandler}
                                value={percentageratio}
                                required
                            />

                        </div>
                        <div>{errper ? (<div className='text-red-900'><strong>Enter valid percentage</strong></div>) : ""}</div>

                    </div>


                    {/* Year range */}

                    <div className="flex flex-col gap-[5px]">
                        <div>
                            <p><strong>Loan Terms(Year)</strong></p>
                        </div>
                        <div className='sm:w-[270px] w-[225px] md:w-[230px] lg:w-[270px]'>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 dark:text-gray-300">Year 0</span>
                                <input
                                    id="years-range"
                                    type="range"
                                    min="0"
                                    max="30"
                                    value={rvalue}
                                    step="1"
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                    onChange={handlerange}
                                    required
                                />
                                <span className="text-gray-700 dark:text-gray-300">Year 30</span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-center">Selected Year: {rvalue}</p>
                        </div>
                    </div>


                    {/* Calculate and reset all button */}

                    <div className="w-full flex flex-row justify-between">
                        <div>
                            <button onClick={calculate_amount} className='p-[10px] bg-white'><strong>Calculate</strong></button>
                        </div>
                        <div>
                            <button

                                onClick={rangehandler}
                                className='p-[10px] bg-white'><strong>Reset all</strong>
                            </button>

                        </div>

                    </div>

                    <div>
                        <hr className="w-[225px] sm:w-[270px] h-px my-[10px] bg-gray-200 border-0 dark:bg-[#A0A0A0] md:w-[230px] lg:w-[270px]" />
                    </div>




                    <div className="w-full flex flex-row justify-between ">
                        <div>
                            <p><strong>Monthly Payment</strong></p>
                        </div>
                        <div>
                            <p><strong>{monthlyPayment}</strong></p>
                        </div>
                    </div>


                </form>
            </div>
        </>
    )
}

export default Money_loan_calculator;