'use client'

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

const testimonials=[
    {
        name:'Vishal',
        avatar:'A',
        title:'Backend engineer',
        desc:"This is the best tool I've ever used "
    },
    {
        name:'Jayant',
        avatar:'B',
        title:'Community manager',
        desc:"This is the best tool I've ever used "
    },
    {
        name:'Ankit',
        avatar:'C',
        title:'Content creator',
        desc:"This is the best tool I've ever used "
    },
    {
        name:'Sourav',
        avatar:'D',
        title:'SDE-1',
        desc:"This is the best tool I've ever used "
    },
]
const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
        <h2 className="mb-10 text-gray-600 text-center text-4xl font-extrabold ">
            Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
                testimonials.map((item)=>(
                    <Card key={item.title} className="border-none bg-blue-950/10 hover:scale-105 duration-150 transition-all">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.desc}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    </div>
  )
}

export default LandingContent
