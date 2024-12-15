"use client"
import Link from "next/link";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Icon from "@/components/Icon";
import { Button, Input } from "@nextui-org/react";

type Inputs = {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
};
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
    });
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const onError: SubmitErrorHandler<Inputs> = data => console.log(data);

    watch((formFields) => {
        console.log(formFields, 'formFields');
    })

    return (
        <div className="mx-auto max-w-[320px]">
            <div className="p-0 text-center text-foreground-900">
                <h1>Create account to BlogHub</h1>
            </div>
            <div className="p-3 mt-3 rounded-xl bg-foreground-50/75">
                <form className="flex w-full flex-wrap gap-3" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Input
                        type="text"
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        label="Username"
                        placeholder="Enter your username"
                        {...register("username", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^[a-zA-Z0-9_]{3,16}$/, message: "Dos't look like a valid username" }
                        })}
                        errorMessage={`${errors.username?.message}`}
                        isInvalid={errors.username ? true : false}
                    />

                    <Input
                        type="email"
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        label="Email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Dos't look like a valid email" }
                        })}
                        errorMessage={`${errors.email?.message}`}
                        isInvalid={errors.email ? true : false}
                    />

                    <Input
                        type={isVisiblePassword.password ? 'text' : 'password'}
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        label="Password"
                        placeholder="Enter your password"
                        endContent={
                            <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                                {isVisiblePassword.password ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                            </button>
                        }
                        {...register("password", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Dos't look like a valid password" }
                        })}
                        errorMessage={`${errors.password?.message}`}
                        isInvalid={errors.password ? true : false}
                    />

                    <Input
                        label="Re-enter Password"
                        type={isVisiblePassword.confirmPassword ? 'text' : 'password'}
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        placeholder="Re-enter your password"
                        endContent={
                            <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleConfirmPasswordVisibility}>
                                {isVisiblePassword.confirmPassword ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                            </button>
                        }
                        {...register("confirmPassword", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Dos't look like a valid password" }
                        })}
                        errorMessage={`${errors.password?.message}`}
                        isInvalid={errors.password ? true : false}
                    />

                    <Button type="submit" className="w-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg" size="sm">Create your account</Button>
                </form>
            </div>

            <div className="p-3 mt-3 border-medium border-foreground-200 rounded-xl">
                <h6 className="text-xs text-center">Already have an account? <Link href={"login"} className="text-primary">Sign in</Link></h6>
            </div>
        </div>
    )
}