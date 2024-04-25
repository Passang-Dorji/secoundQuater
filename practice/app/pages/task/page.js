"use client"
import { useState,useMemo } from "react"
import Sidebar from "@/app/components/sidebar"

export default function Home(){
    const [name,setName] = useState()
    const [description,setDescription] = useState()
    const [status,setStatus] = useState()

        const rows = useMemo(() =>{
               return description?.split('\n').reduce((acc,stringlength) => {
                let linelength = Math.floor(stringlength.length/70)
                    return acc + 1 +linelength
                },0)
        },[description]) 
    async function CreateTask(){
        try{
            const response = await fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify({
                    user_id:1,
                    name,
                    description,
                    status
                })
            })
            if (!response.ok){
                throw new error("network response was not okay")
            }
            const {body} = await response.json()
            setName(""),
            setDescription(""),
            setStatus("")
        }catch (error){
            console.error("error fetching details",error)
        }
    }
    return(
        <div className="mx-4 mt-4">
            <div>
                    <Sidebar/>
            </div>
            <div className="md:ml-64">
                <div className=" ml-2 mt-2 border-2 flex flex-col pb-2 bg-white">
                    <input className="mx-4 text-black rounded-lg pl-2 mt-2 w-1/4"
                        type ="text" 
                        placeholder="Task Name"
                        onChange={(e)=>setName(e.target.value)}
                        value={name}
                    />
                    <textarea className="text-black border-black border-2 rounded-2xl w-1/2 text-wrap font-bold ml-4 pl-2 my-4"
                       type="text"
                       rows={rows}
                        cols={70}
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        placeholder="Describe Task"
                    />
                    <div className=" mt-2 ml-2">
                        <input className="ml-4 text-black border-2 border-black "
                            type="file"
                            onChange={(e)=>console.log(e.target.value)}
                        />
                        <select className="mx-4 text-black rounded-lg pl-2 my-4"type = "text" 
                            onChange={(e)=>setStatus(e.target.value)}
                            value={status}
                        >
                            <option value = ''>status</option>
                            <option value = 'In process'>In process</option>
                            <option value = 'Completed'>Completed</option>
                            <option value = 'Pending'>Pending</option>
                        </select>
                        <button className="border-2 bg-blue-500 ml-4 mt-4 rounded-lg px-2"
                            onClick={CreateTask}
                        > create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
