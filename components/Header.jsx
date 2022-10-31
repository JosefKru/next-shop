import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { AiOutlineUser } from 'react-icons/ai'

function Header() {
  const session = false

  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#f0f7fd] p-11">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-10 w-20 cursor-pointer opacity-90 transition hover:opacity-100">
            <Image
              src="/logo.svg"
              layout="fill"
              objectFit="contain"
              alt="logo"
            />
          </div>
        </Link>
      </div>
      <div className="hidden flex-1 items-center justify-center space-x-8 md:flex">
        <a href="" className="headerLink">
          Categories
        </a>
        <a href="" className="headerLink">
          Link
        </a>
        <a href="" className="headerLink">
          About
        </a>
        <a href="" className="headerLink">
          Contacts
        </a>
      </div>
      <div className="flex items-center justify-center gap-x-4 md:w-1/5">
        <BiSearchAlt className="headerIcon" />
        <Link href="/checkout">
          <div className="relative cursor-pointer">
            <span className="absolute -right-1 -top-1 z-50 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-[10px]  text-white">
              5
            </span>
            <HiOutlineShoppingCart className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image alt="" className="headerIcon" width={34} height={34} />
        ) : (
          <AiOutlineUser className="headerIcon" />
        )}
      </div>
    </header>
  )
}

export default Header
