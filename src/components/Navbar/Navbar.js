import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
    <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
        <div className='container'>
            <Link to={'/'} className='navbar-brand '>
            <i className="fa-solid fa-address-book mx-2 "></i>Contact List</Link>
        </div>
        
    </nav>
    </>
  )
}
