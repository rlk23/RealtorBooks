"use client";

import React from 'react';

function ExpensesCard(){

    const expensesThisMonth = "$5,000";

    return (

        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Expenses This Month</h2>
                <p className="text-lg">You've spent <span className="font-bold">{expensesThisMonth}</span> on expenses this month.</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default ExpensesCard;



