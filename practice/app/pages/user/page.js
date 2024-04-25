"use client"

import { useState } from "react"

export default function Home(){
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [contact,setContact] = useState()

    async function MakeUser(){
       try{
           const response = await fetch('/api/user',{
                method:'POST',
                body:JSON.stringify({
                    name,
                    email,
                    contact
                })
            })
            if(!response.ok){
                throw new Error("network response was not okay");
            }
            const {body} = await response.json()
            setName(name),
            setEmail(email),
            setContact(contact)
        
       } catch (error){
        console.error("error fetching details ",error)
       }
    }
    return (
        <div className="justify-center">
            <input className="text-black mx-2 " type="text" 
                onChange={(e)=> setName(e.target.value)} 
                value={name}
            ></input>
            <input className="text-black mx-2 " type="text" 
                onChange={(e)=> setEmail(e.target.value)} 
                value={email}
            ></input>
            <input className="text-black mx-2 " type="text" 
                onChange={(e)=> setContact(e.target.value)} 
                value={contact}
            ></input>
            <button className="border-2 border-white" onClick={MakeUser}
            > create</button>
        </div>
    )
}