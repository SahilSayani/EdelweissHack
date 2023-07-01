"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs'
const inter = Inter({ subsets: ['latin'] })

import React, { PropsWithChildren } from 'react'
import Navbar from './Navbar'
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
        <body className={`${inter.className} `}>
          <Navbar />
          {children}
        </body>
      </StyleProvider>
    </>
  )
}
export default Layout
