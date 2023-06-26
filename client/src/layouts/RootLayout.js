import React from 'react'
import "./RootLayout.css"
import { NavLink, Outlet } from 'react-router-dom';
import logo from '../logo.jpg'
export default function RootLayout() {
  return (
    <div className='root-layout'>
    <header>
        <nav>
            <NavLink to="/">
            <img src={logo} alt="Logo" />
            </NavLink>
            <NavLink to="/" className='logo'>Gene Search</NavLink>
            <NavLink to="/" className="item">Home</NavLink>
            <NavLink to="/singleLookup" className="item">
            Single Gene Lookup</NavLink>
            <NavLink to="/singleWeighted" className="item">
            Specificity/Coverage Lookup</NavLink>
        </nav>
      </header>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}
