'use client'

import { useEffect, useState } from "react"
import ProModalUi from "./pro-modal-ui"

const ProModalprovider = () => {
    const [mounted,setIsMounted]=useState(false)
    useEffect(()=>{
        setIsMounted(true);
    },[])
    if(!mounted){
        return null;
    }
  return (
    <div><ProModalUi/></div>
  )
}

export default ProModalprovider