"use client";
import Modal from "@mui/material/Modal";
import SignIn from "../signin/page";
import { useState } from "react";

export default function Page() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <>
            
            <Modal open={open} onClose={handleClose}>

                <SignIn />

            </Modal>
        </>

    )
}