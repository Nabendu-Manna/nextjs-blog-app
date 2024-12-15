"use client"
import Link from "next/link";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import Icon from "@/components/Icon";
import { Button, Input } from "@nextui-org/react";

type Inputs = {
    email: string,
    password: string,
};
export default function Login() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);
    const onError: SubmitErrorHandler<Inputs> = data => console.log(data);

    return (
        <div className="mx-auto max-w-[320px]">
            <div className="p-0 text-center text-foreground-900">
                <h1>Sign in to BlogHub</h1>
            </div>
            <div className="p-3 mt-3 rounded-xl bg-foreground-50/75">
                <form className="flex w-full flex-wrap gap-3" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Input
                        type="email"
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        label="Username or email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Dos't look like a valid email" }
                        })}
                        errorMessage={`${errors.email?.message}`}
                        isInvalid={errors.email ? true : false}
                        aria-invalid={errors.email ? "true" : "false"}
                    />

                    <Input
                        type={isVisible ? 'text' : 'password'}
                        size="sm"
                        labelPlacement="outside"
                        variant="faded"
                        label="Password"
                        placeholder="Enter your password"
                        endContent={
                            <button aria-label="toggle password visibility" className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (<Icon name="eye" />) : (<Icon name="eye-off" />)}
                            </button>
                        }
                        {...register("password", {
                            required: { value: true, message: "This field is required" },
                            pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: "Dos't look like a valid password" }
                        })}
                        errorMessage={`${errors.password?.message}`}
                        isInvalid={errors.password ? true : false}
                    />

                    <Button type="submit" className="w-full bg-gradient-to-tr from-primary to-secondary text-white shadow-lg" size="sm">Sign in</Button>
                </form>
            </div>

            <div className="p-3 mt-3 border-medium border-foreground-200 rounded-xl">
                <h6 className="text-xs text-center">New to BlogHub? <Link href={"register"} className="text-primary">Create an account</Link></h6>
            </div>
        </div>
    )
}