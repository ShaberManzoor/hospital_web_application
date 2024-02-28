import React, { useContext, useEffect, useRef } from 'react'
import logo from '../assets/images/logo.png'
import {NavLink, Link} from 'react-router-dom'
import userImg from '../assets/images/avatar-icon.png'
import { BiMenu } from 'react-icons/bi'
import { authContext } from '../context/AuthContext'

const navLinks = [
  {
    path: '/',
    display: 'Home'
  },
  {
    path: '/doctors',
    display: 'Find a doctor'
  },
  {
    path: '/services',
    display: 'Services'
  },
  {
    path: '/contact',
    display: 'Contact'
  }
]

const Header = () => {
  const headRef = useRef(null);
  const menuRef = useRef(null);
  const {user, role, token} = useContext(authContext);

  const handleStickyHeader = () => {
    window.addEventListener('scroll', ()=> {
      if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
        headRef.current.classList.add('sticky_header');
      }else{
        headRef.current.classList.remove('sticky_header');
      }
    })
  }

  useEffect(() => {
    handleStickyHeader();
    return ()=> window.removeEventListener('scroll', handleStickyHeader);
  });

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu')
  return (
    <header className="header flex items-center" ref={headRef}>
      <div className="container">
        <div className="flex items-center justify-between">
          <div>
            <img src={logo} alt="" />
          </div>

          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-center gap-[2.7rem]">
              {
                navLinks.map((link, index) => 
                <li key={index}>
                  <NavLink to={link.path} className={navClass=> navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]': 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>
                    {link.display}
                  </NavLink>
                </li>)
              }
            </ul>
          </div>

          <div className="flex items-center gap-4">
            {
              token && user ? (<div>
              <Link to={`${role==='doctor' ? '/doctors/profile/me' : '/users/profile/me'}`} className='flex items-center gap-3'>
                <figure className='w-[35px] h-[35px] rounded-full cursor-pointer'>
                  <img 
                  src={user?.photo} 
                  alt="user"
                  className='rounded-full cursor-pointer' />
                </figure>
                <h2>{user?.name}</h2>
              </Link>
            </div>) :( <Link to={'/sign-in'}>
              <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-3xl">Login</button>
            </Link>)
            }
          
            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className='w-6 h-6 cursor-pointer' />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header