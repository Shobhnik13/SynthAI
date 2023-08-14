import Image from 'next/image'
import React from 'react'

const LoaderComp = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 h-full'>
        <div className='w-10 h-10 relative animate-spin'>
            <Image src={'/logo.png'} fill alt='loading...'/>
        </div>
        <p className='text-sm text-muted-foreground'>SynthAI is generating answers...</p>
    </div>
  )
}

export default LoaderComp