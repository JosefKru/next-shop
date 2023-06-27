import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { AiOutlineUser } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { selectBasketItems } from '../redux/basketSlice'
import { useSession, signIn, signOut } from 'next-auth/react'

function Header({ bg = null }) {
  const { data: session } = useSession()
  const items = useSelector(selectBasketItems)

  const nav = [
    {
      title: 'Categories',
      href: '',
      className: 'headerLink',
    },
    {
      title: 'About',
      href: '',
      className: 'headerLink',
    },
    {
      title: 'Contacts',
      href: '',
      className: 'headerLink',
    },
    {
      title: 'Blog',
      href: '',
      className: 'headerLink',
    },
    {
      title: 'FAQ',
      href: '',
      className: 'headerLink',
    },
  ]

  // console.log(session)
  return (
    <header className={`flex w-full items-center justify-between p-11 ${bg}`}>
      <div className='flex items-center justify-center md:w-1/5'>
        <Link passHref href='/'>
          <div className='relative h-24 w-32 cursor-pointer transition md:h-24 md:w-48'>
            <Image
              src='/logo2.png'
              layout='fill'
              objectFit='contain'
              alt='logo'
            />
          </div>
        </Link>
      </div>
      <nav className='hidden flex-1 items-center justify-center space-x-8 md:flex'>
        {nav.map((n, i) => (
          <Link href={n.href} className={n.className} key={i}>
            {n.title}
          </Link>
        ))}
      </nav>
      <div className='flex items-center justify-center gap-x-4 md:w-1/5'>
        <BiSearchAlt className='headerIcon hidden sm:inline-flex' />
        <Link passHref href='/checkout'>
          <div className='relative cursor-pointer'>
            <span className='absolute -right-3 -top-3 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-[#ffb74a] to-[#ff5b4b] text-[14px]  font-bold text-white'>
              {items.length}
            </span>
            <HiOutlineShoppingCart className='headerIcon' />
          </div>
        </Link>

        {session ? (
          <Image
            src={
              session.user?.image ||
              'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
            }
            alt='avatar'
            className='cursor-pointer rounded-full'
            width={34}
            height={34}
            onClick={() => signOut()}
          />
        ) : (
          <AiOutlineUser className='headerIcon' onClick={() => signIn()} />
        )}
      </div>
    </header>
  )
}

export default Header
