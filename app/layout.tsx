import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <body className={`${inter.className} bg-slate-800 text-slate-100`}>
        <Navbar />
        {children}
      </body>
    </>
  )
}
export default Layout
