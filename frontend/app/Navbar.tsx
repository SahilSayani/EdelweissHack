import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/logo.svg'
const Navbar = () => {
  return (
    <header className='sticky top-0 w-full bg-green-50 py-4 shadow-sm z-20'>
      <nav className='mx-auto flex max-w-7xl flex-row items-center justify-between px-8'>
        <div className='flex items-center '>
          <div>
            <Link href='/'>
              <Image src={logo} alt='' width='100' height='100' />
            </Link>
          </div>
          <div className='justify-end'>
            <ul className='list-reset md:flex md:items-center '>
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
        </div>
      </nav>
    </header>
  )
}
export default Navbar
