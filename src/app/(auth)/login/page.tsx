"use client"
import Icon from "@/components/Icon";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible((prev) => !prev);
    return (
        <div className="mx-auto max-w-[320px]">
            <div className="p-0 text-center text-foreground-900">
                <h1>Sign in to BlogHub</h1>
            </div>
            <div className="p-3 mt-3 rounded-xl bg-foreground-50/75">
                <form className="flex w-full flex-wrap gap-3">
                    <Input label="Username or email" type="email" size="sm" labelPlacement="outside" variant="faded" placeholder="Enter your email" />

                    <Input label="Password" type={isVisible ? 'text' : 'password'} size="sm" labelPlacement="outside" variant="faded" placeholder="Enter your password" endContent={
                        <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                        </button>
                    } />

                    <Button className="w-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg" size="sm">Sign in</Button>
                </form>
            </div>

            <div className="p-3 mt-3 border-medium border-foreground-200 rounded-xl">
                <h6 className="text-xs text-center">New to BlogHub? <Link href={"register"} className="text-primary">Create an account</Link></h6>
            </div>
        </div>
    )
}