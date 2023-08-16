import Image from 'next/image'
interface LoaderProps{
  purpose:string,
}
const LoaderComp = ({purpose}:LoaderProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 h-full'>
        <div className='w-10 h-10 relative animate-spin'>
            <Image src={'/logo.png'} fill alt='loading...'/>
        </div>
        <p className='text-sm text-muted-foreground'>SynthAI is generating {purpose}...</p>
    </div>
  )
}

export default LoaderComp