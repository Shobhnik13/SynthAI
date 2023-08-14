import Image from "next/image"

interface EmptyProps{
    label:string

}
const Empty = ({
    label
}:EmptyProps) => {
  return (
    <div className="flex justify-center items-center flex-col h-full p-5">
        <div className="relative h-72 w-72">
            <Image src={'/empty.png'} alt="empty" fill/>
        </div>
        <p className="text-muted-foreground text-sm text-center">{label}</p>
    </div>
  )
}

export default Empty