import Image from 'next/image'
interface LoaderProps{
  purpose:string,
  instruction:string,
}
const LoaderComp = ({purpose,instruction}:LoaderProps) => {
  return (
    <div className='flex flex-col items-center justify-center gap-y-4 h-full'>
        <div className='w-10 h-10 relative animate-spin'>
            <Image src={'/logo.png'} fill alt='loading...'/>
        </div>
        <p className='text-sm text-muted-foreground'>SynthAI is generating {purpose}....{instruction}</p>
    </div>
  )
}

export default LoaderComp