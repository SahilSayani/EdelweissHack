import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.svg'
import { useState } from "react";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className='sticky top-0 w-full bg-green-50 py-4 shadow-sm z-20'>
      <nav className='mx-auto flex max-w-7xl flex-row items-center justify-between px-8'>
        <div className='flex items-center'>
          <div>
            <Link href='/'>
              <Image src={logo} alt='' width='100' height='100' />
            </Link>
          </div>
          <div className='justify-end'>
            <ul className='list-reset md:flex md:items-center hidden md:block '>
              <li className='md:ml-6'>
                <Link
                  className='block no-underline py-2 text-green-900 hover:text-green-500 md:border-none md:p-0'
                  href='/'
                >
                  Home
                </Link>
              </li>
              <li className='md:ml-6'>
                <Link
                  className='border-t block no-underline py-2 text-green-900 hover:text-green-500 md:border-none md:p-0'
                  href='/dashboard'
                >
                  Dashboard
                </Link>
              </li>
              <li className='md:ml-6'>
                <Link
                  className='border-t block no-underline py-2 text-green-900 hover:text-green-500  md:border-none md:p-0'
                  href='/'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </div>
        </div>
    </nav>
    
    </header>
  )
}
export default Navbar
