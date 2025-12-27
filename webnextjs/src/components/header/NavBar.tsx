"use client";

import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
        <div>
            <ul>
                <Link href="./">Home </Link>
                <Link href="/myprojects">Projects </Link>
                <Link href="/dashboard">Dashboard</Link>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar