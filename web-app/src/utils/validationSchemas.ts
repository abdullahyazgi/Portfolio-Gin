import { z } from "zod";

export const SigninSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const SignupSchema = z.object({
  name: z.string().min(2, {message: "Name must be at lest 2 characters long"}),
  email: z.string().email({ message: "Invalid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must be al latest 6 characters long" }),
})