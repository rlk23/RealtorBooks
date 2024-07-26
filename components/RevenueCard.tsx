"use client";

import React from 'react';

function RevenueCard(){
    const revenueThisMonth = "$10,000";

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Revenue This Month</h2>
                <p className="text-lg">You've made <span className="font-bold">{revenueThisMonth}</span> in revenue this month.</p>
                <div className="card-actions justify-end"> 
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );

};

export default RevenueCard;


