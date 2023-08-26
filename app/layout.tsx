import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import ProModalprovider from '../components/pro-modal-provider'
import ToastProvider from '../components/toast-provider'
import CrispProvider from '../components/crisp-provider'

const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'SynthAI- A complete AI SaaS you need!',
  description: '',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <CrispProvider/>
      <body className={inter.className}>
        <ProModalprovider/>
        <ToastProvider/>
        {children}
        </body>
    </html>
    </ClerkProvider>
  )
}
