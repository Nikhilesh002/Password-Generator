import React from 'react';
import { useState,useCallback,useEffect,useRef } from 'react';

function App() {

  const [length,setLength]=useState(5);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const [password,setPassword]=useState("");
  const [btnText,setBtnText]=useState("Copy");

  let passwordGenerator=useCallback(()=>{
    setBtnText("Copy");
    let str="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if(numberAllowed) str+="1234567890";
    if(charAllowed) str+="~!@#$%^&*()_+=-`,./[];'\<>?:{}|";
    let pass="";
    for (let i = 0; i < length; i++) {
      const index=Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(index);
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed,setPassword,setBtnText])

  useEffect(passwordGenerator,[length,numberAllowed,charAllowed,setPassword])

  //useRef hook
  const passwordRef=useRef(null);

  function copyPassToClip(){
    //as we are working in react, window is present
    //but in nextjs, we work on server side and window is not present there

    //without useRef hook
    window.navigator.clipboard.writeText(password);
    //with useRef hook
    //passwordRef.current?.select(); //whole
    //passwordRef.current?.setSelectionRange(0,3); //range

    setBtnText("Copied!");
  }

  return (
    <div>
      <div className="w-full max-w-xl mx-auto shadow-md px-6 py-8 my-16 rounded-md bg-gray-600">
        <h1 className="text-4xl text-orange-400 font-mono bg-blue-300 p-4 text-center rounded-md my-5 mx-4">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 mx-5 bg-blue-400">
          <input type="text" value={password} ref={passwordRef} className="outline-none w-10/12 py-1 px-3" placeholder="Password" readOnly />
          <button onClick={copyPassToClip} className="text-white w-2/12 m-full ">{btnText}</button>
        </div>
        <div className="flex text-sm gap-x-9 mx-6">
          <div className="flex items-center gap-x-1 w-6/12">
            <input type='range' min={5} max={50} value={length} className='cursor-pointer'
            onChange={(e)=>setLength(e.target.value)} />
            <label className='text-white'>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1 w-3/12">
            <input type="checkbox" defaultChecked={numberAllowed} id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }} />
            <label className='text-white' htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1 w-3/12">
            <input type="checkbox" defaultChecked={charAllowed} id='charInput'
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }} />
            <label className='text-white' htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
