'use client'

import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"

const LandingHero = () => {
    const {isSignedIn}=useAuth()
  return (
    <div className="font-bold py-36 text-center space-y-5">
            <div className="text-3xl text-gray-700 sm:text-4xl md:text-5xl lg:text-6xl space-y-5 font-extrabold">
                <h1>The best AI Software as a Service </h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    <TypewriterComponent
                    options={{
                        strings:[
                            'Chatbot',
                            'Photo Generation',
                            'Music Generation',
                            'Video Generation',
                            'Code Generation',
                        ],
                        autoStart:true,
                        loop:true,
                    }}/>
                </div>
            </div>
        <h2 className="text-sm md:text-2xl font-light text-gray-500 ">AI-Powered Excellence, Delivered as a Service.</h2>
        <Link href={isSignedIn?'/dashboard':'/sign-up'}>
            <Button  className="animate-bounce  bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-600 md:text-lg p-4 md:p-6 mt-4 duration-1000 transition-all rounded-full font-semibold">Start Exploring!</Button>
        </Link>
        <div className="text-zinc-400 text-xs md:text-sm font-normal">
            Ready to Dive into AI? No Credit Card, No Stress.
        </div>
    </div>
  )
}

export default LandingHero