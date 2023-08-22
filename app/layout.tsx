import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import ProModalprovider from '../components/pro-modal-provider'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'SynthAI- A complete AI SaaS you need!',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <ProModalprovider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
