'use client'

import { Crisp } from "crisp-sdk-web"
import { useEffect } from "react"

const CrispChat = () => {
 useEffect(()=>{
    Crisp.configure("5b24f64c-ccf3-4599-b6d9-655b489e7fa4")
 },[])
 return null;
}

export default CrispChat