import { useEffect, useMemo, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { desAtom, eventAtom, lisAtom, titAtom } from './atoms'
function App() {
  return (
    <>
    <RecoilRoot>
      <Parent/>
      <List/>
    </RecoilRoot>
    </>
  )
}
function List(){
  function idGen(){
    const random = (Math.random())*100000;
    return random;
  }
  const [todos,todoList] = useRecoilState(lisAtom);
  useEffect(()=>{
    fetch('http://localhost:3000/todos').then(async (res)=>{
    const obj = await res.json();
    todoList(obj.list);
    });
  },[]);
  return <div>
    {todos.map((todo)=>{
      return<ol key = {idGen()} >
        <h1>{todo.title}</h1><br/>
        <div>{todo.description}</div>
        <div>{todo.status ? "Done" : "Incomplete"}</div>
      </ol>
    })}
  </div>
}
function TitBox(){
  const setInputValue = useSetRecoilState(titAtom);
  const handler = (event)=>{
    setInputValue(event.target.value);
  }
   return<div>
    <input type='text' onChange={handler} placeholder='Enter title'></input>
   </div>
}
function DesBox(){
  const setDesValue = useSetRecoilState(desAtom);
  const handler = (event)=>{
    setDesValue(event.target.value);
  }
   return<div>
    <input type='text' onChange={handler} placeholder='Enter Description'></input>
   </div>
}
function Button(){
  const t = useRecoilValue(titAtom);
  const d = useRecoilValue(desAtom);
  const setter = useSetRecoilState(lisAtom);
  const adder = async ()=>{
    const targ = {
      title:t,
      description:d,
      status:false
    }
     if(t == "" || d == ""){
      alert("You must enter an Value in boxes");
      return;
     }
      const response = await fetch('http://localhost:3000/addTodo',{
        method:'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(targ)
      });
      if(!response.ok){
        alert("Error occurred");
      }
      else {alert("added successfull");
        const obj = await response.json();
        setter(obj.list);
      }
  }
  return<div>
    <button onClick={adder}>
      Add Todo
    </button>
  </div>
}
function Parent(){
  return <>
  <div>
  <TitBox/>
  <DesBox/>
  <Button/>
  </div>
  </>
}
export default App
