import Link from "next/link"
import NavBar from "./NavBar"

const Header = () => {
    return (
        <header>
            <NavBar />
            <div className="flex justify-center">
                <Link href="/signin">Sign in</Link>
            </div>
        </header>
    )
}

export default Header