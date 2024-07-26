"use client";

import React from 'react';

function TotalCard() {
    const accountBalance = "$89,400";
    const currentBalance = "$89,400";

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <div className="flex space-x-4"> {/* Flex container with horizontal spacing */}
                    <div className="stat flex-1"> {/* Flex item taking equal width */}
                        <h2 className="card-title">Account Balance</h2>
                        <p className="text-lg"><span className="font-bold">{accountBalance}</span></p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Add Funds</button>
                        </div>
                    </div>

                    <div className="stat flex-1 mt-0"> {/* Flex item taking equal width, removed mt-4 for alignment */}
                        <h2 className="card-title">Current Balance</h2>
                        <p className="text-lg"><span className="font-bold">{currentBalance}</span>.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Withdrawal</button>
                            <button className="btn btn-primary">Deposit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TotalCard;