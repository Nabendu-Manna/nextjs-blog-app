import "./style.css";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import { Image } from "@nextui-org/react";

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>

            <div
                aria-hidden="true"
                className="fixed hidden dark:md:block dark:opacity-70 -bottom-[50%] -right-[50%] z-0"
            >
                <Image removeWrapper alt="docs left background" src="/gradients/looper-pattern.svg" />
            </div>
        </>
    );
}

export default LoginLayout;