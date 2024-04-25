"use client"
import { useState } from "react"
import Graph from "@/app/components/graph"

export default function Expenses(){
    const [amount,setAmount] = useState()

    async function CreateExpenses(){
        try{
                const response = await fetch('/api/expenses',{
                    method: 'POST',
                    body: JSON.stringify({
                        user_id:1,
                        amount
                    })
                })
                if (!response.ok){
                    throw new error("network response was not okay")
                }
                        const {body} = await response.json()
                        setAmount(" ")
        }catch (error){
            console.error("error fetching data",error)
        }
    }
    return(
        <div className="flex grid-col bg-slate-500 h-screen">
            <div className=" ml-4 mt-4 rounded-lg w-1/2">
                <input className="text-black border-2 rounded-lg pl-4"
                    type="number"
                    placeholder="amount"
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button className="border-2 border-white ml-4 rounded-lg px-2"
                    onClick={CreateExpenses}
                >Add expenses</button>
                <div className=" mt-3">
                    <h1 className="mb-2 font-bold">Daily Expenses Graph</h1>
                    <Graph/>
                </div>
            </div>
            <div className="w-1/2 bg-white mt-4 mx-4 h-3/4">

            </div>
        </div>
    )
}