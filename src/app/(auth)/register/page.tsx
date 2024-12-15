"use client"
import Icon from "@/components/Icon";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

type passwordVisibleStatus = {
    password: boolean;
    confirmPassword: boolean;
};
const passwordVisibleStatusInitial: passwordVisibleStatus = {
    password: false,
    confirmPassword: false,
}

export default function Register() {
    const [isVisiblePassword, setIsVisiblePassword] = React.useState<passwordVisibleStatus>(passwordVisibleStatusInitial);
    const togglePasswordVisibility = () => setIsVisiblePassword((prev) => {
        return {
            password: !prev.password,
            confirmPassword: prev.password ? prev.confirmPassword : false,
        }
    });
    const toggleConfirmPasswordVisibility = () => setIsVisiblePassword((prev) => {
        return {
            confirmPassword: !prev.confirmPassword,
            password: prev.confirmPassword ? prev.password : false,
        }
    });;
    return (
        <div className="mx-auto max-w-[320px]">
            <div className="p-0 text-center text-foreground-900">
                <h1>Sign in to BlogHub</h1>
            </div>
            <div className="p-3 mt-3 rounded-xl bg-foreground-50/75">
                <form className="flex w-full flex-wrap gap-3">
                    <Input label="Username" type="text" size="sm" labelPlacement="outside" variant="faded" placeholder="Enter your username" />

                    <Input label="Email" type="email" size="sm" labelPlacement="outside" variant="faded" placeholder="Enter your email" />

                    <Input label="Password" type={isVisiblePassword.password ? 'text' : 'password'} size="sm" labelPlacement="outside" variant="faded" placeholder="Enter your password" endContent={
                        <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                            {isVisiblePassword.password ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                        </button>
                    } />

                    <Input label="Re-enter Password" type={isVisiblePassword.confirmPassword ? 'text' : 'password'} size="sm" labelPlacement="outside" variant="faded" placeholder="Re-enter your password" endContent={
                        <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                            {isVisiblePassword.confirmPassword ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                        </button>
                    } />

                    <Button className="w-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg" size="sm">Create your account</Button>
                </form>
            </div>

            <div className="p-3 mt-3 border-medium border-foreground-200 rounded-xl">
                <h6 className="text-xs text-center">Already have an account? <Link href={"login"} className="text-primary">Sign in</Link></h6>
            </div>
        </div>
    )
}