"use client";
import Link from "next/link";

interface NavbarProps {
  role: boolean;
}

const NavBar = ({ role }: NavbarProps) => {
  return (
    <nav>
        <div>
            <ul>
                <Link href="./">Home </Link>
                <Link href="/myprojects">Projects </Link>
                {role && (<Link href="/dashboard">Dashboard</Link>)}
            </ul>
        </div>
    </nav>
  )
}

export default NavBar