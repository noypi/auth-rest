'use client';

import React from 'react';
import styles from './Styles.module.css';

const Input = ({children, htmlFor, id, placeholder}) => {
    return (<>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={htmlFor} >
                {children}
            </label>
            <input id={id} name={id} type="text" placeholder={placeholder} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  />
        </div>
    </>)
}

const SubmitBtn = () => {
    return (
        <>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Submit
                </button>
            </div>
        </>
    )
}

export default function Create() {
    const submitHandler = async (e: any) => {
        e.preventDefault();
        let inputs = [... e.target.querySelectorAll('input') ]
                        .map(({id, name, value}) => ({name, value}));
        
        const payload = JSON.stringify(inputs);
        console.debug({payload});
        const res = await fetch(`/api/create/user`, {
                        method: 'POST',
                        body: payload,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
        console.debug({res});
    }

    return (
        <div className="w-full max-w-xs">
            <form onSubmit={submitHandler} action="/create/user" method="POST" className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Input htmlFor="last" id="username" placeholder="Enter User ID">User ID</Input>
                <Input htmlFor="first" id="name" placeholder="Enter Your Name">Name</Input>
                <Input htmlFor="first" id="password" placeholder="Enter Password">Password</Input>
            
                <SubmitBtn />
            </form>
        </div>
      )
}
