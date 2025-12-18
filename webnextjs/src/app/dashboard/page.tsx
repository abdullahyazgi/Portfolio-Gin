import { auth } from "@/auth";
import { signoutAction } from "@/actions/auth.action";

const Dashboard = async() => {
    const session = await auth();
    console.log(session)
  return (
    <div>{session?.user && 
        <>
            <h1>
                Welcome {session.user.name}
            </h1>
            <form action={signoutAction}>
              <button type="submit">Sign out</button>
            </form>
        </>
    }</div>
  )
}

export default Dashboard