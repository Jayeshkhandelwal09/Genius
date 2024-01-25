"use client"

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"

export const CrispChat = () =>{
    useEffect(()=>{
        Crisp.configure("d42b6c61-fd31-454b-aa30-79c9a88e41b3")
    },[]);

    return null
}