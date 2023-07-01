import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logoDark from "../assets/logoDark.svg"
const Navbar = () => {
  return (
    <nav>
    <div className="flex justify-between px-6 py-4">
    <Link href="/"><Image src={logoDark} alt="" width="100" height="100" /></Link>    
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
