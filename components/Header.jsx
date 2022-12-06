import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'
import { useSession, signIn, signOut } from 'next-auth/react'

function Header() {
  const { data: session } = useSession()
  const items = useSelector(selectBasketItems)

  // console.log(session)
  return (
    <header className="flex w-full items-center justify-between bg-[#f0f7fd] p-11">
      <div className="flex items-center justify-center md:w-1/5">
        <Link href="/">
          <div className="relative h-20 w-40 cursor-pointer transition">
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
            <span className="absolute -right-3 -top-3 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-[#ff5b4b] text-[14px]  font-bold text-white">
              {items.length}
            </span>
            <HiOutlineShoppingCart className="headerIcon" />
          </div>
        </Link>

        {session ? (
          <Image
            src={
              session.user?.image ||
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            }
            alt="avatar"
            className="cursor-pointer rounded-full"
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <AiOutlineUser className="headerIcon" onClick={() => signIn()} />
        )}
      </div>
    </header>
  )
}

export default Header
