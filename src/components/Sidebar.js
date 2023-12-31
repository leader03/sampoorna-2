import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { BsArrowLeftCircle } from 'react-icons/bs'
import { AiFillPieChart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import HamburgerButton from './HamburgerMenuButton/HamburgerButton'
import { FaBook, FaChartBar, FaChartLine } from 'react-icons/fa'

const Sidebars = () => {
  const [open, setOpen] = useState(true)
  const [mobileMenu, setMobileMenu] = useState(false)
  const location = useLocation()

  const Menus = [
    { title: 'Dashboard', path: '/report', src: <AiFillPieChart /> },
    { title: 'Billing', path: '/billing', src: <FaChartBar /> },
    { title: 'Books', path: '/books', src: <FaBook /> },
    { title: 'Sales', path: '/sales', src: <FaChartLine />,},
    { title: 'Customer', path: '/customer', src: <CgProfile />,},
  ]

  return (
    <>
      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block fixed h-screen duration-300 bg-gray-50 border-r border-gray-200  p-5 mt-6`}
      >
        {/* <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800  rounded-full cursor-pointer top-9 -right-4  `}
          onClick={() => setOpen(!open)}
        /> */}
          {/* <div className={`flex ${open && 'gap-x-4'} items-center z-50`}>
            {open && (
              <span className='text-xl px-3 font-medium whitespace-nowrap '>
                Sampurna Kitab
              </span>
            )}
          </div> */}

        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <Link to={menu.path} key={index}>
              <li
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded cursor-pointer  hover:bg-slate-700 hover:text-gray-100 
                        ${menu.gap ? 'mt-9' : 'mt-2'} ${
                  location.pathname === menu.path &&
                  'bg-slate-700 text-gray-100 '
                }`}
              >
                <span className='text-2xl'>{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left  hover:block`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6   bg-gray-50 dark:bg-slate-800 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={menu.path}
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname === menu.path &&
                  'bg-gray-200 '
                } p-2 rounded-xl hover:bg-gray-200 `}
              >
                {menu.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sidebars
