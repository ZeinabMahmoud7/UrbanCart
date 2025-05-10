import { useState } from "react"



export default function useOnline(){
    const [IsOnline,SetIsOnline]=useState(true);
window.addEventListener("online",()=>{
    SetIsOnline(true);
})
window.addEventListener("offline",()=>{
    SetIsOnline(false);
})
return IsOnline;
}