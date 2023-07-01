import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="border-white">
    <div className="flex justify-between px-6 py-4">
    <Link href="/"><h3>FutuR</h3></Link>    
    <ul className="list-reset md:flex md:items-center">
      <li className="md:ml-6">
        <Link className="block no-underline py-2 text-grey-darkest hover:text-gray-300 md:border-none md:p-0" href="/">
          Home
        </Link>
      </li>
      <li className="md:ml-6">
        <Link className="border-t block no-underline py-2 text-grey-darkest hover:text-gray-300 md:border-none md:p-0" href="/dashboard">
          Dashboard
        </Link>
      </li>
      <li className="md:ml-6">
        <Link className="border-t block no-underline py-2 text-grey-darkest hover:text-gray-300 md:border-none md:p-0" href="/">
          Contact
        </Link>
      </li>
    </ul>
    </div>
  </nav>
  )
}
export default Navbar
