"use client";
import { SignupSchema } from "@/utils/validationSchemas";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { signupAction } from "@/actions/auth.action";


const SignupForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clientError, setClientError] = useState("");
    const [serverError, setServerError] = useState("");
    const [serverSuccess, setServerSuccess] = useState("");

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const user = { email, password, name };

        const validation = SignupSchema.safeParse(user);
        if (!validation.success)
            return setClientError(validation.error.issues[0].message)

        signupAction(user).then((result) => {
            if (result.success) {
                setClientError("");
                setServerError("");
                setName("");
                setEmail("");
                setPassword("");
                setServerSuccess(result.message);
            }

            if(!result.success) {
                setServerSuccess("");
                setServerError(result.message);
            }
        });
    }
    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex flex-col mb-3">
                <label htmlFor="username">Name</label>
                <input className="border border-amber-400" type="text" id="username" value={name} onChange={(e) => setName(e.target.value)} />
                <label htmlFor="email">Email</label>
                <input className="border border-amber-400" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input className="border border-amber-400" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {(clientError || serverError) && <Alert severity="error">{clientError || serverError}</Alert>}
            {serverSuccess && <Alert severity="success">{serverSuccess}</Alert>}
            <button type="submit">Sign up</button>
        </form>
    )
}

export default SignupForm