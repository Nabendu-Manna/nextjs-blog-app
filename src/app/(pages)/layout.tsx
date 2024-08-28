import "./style.css";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import { Image } from "@nextui-org/react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main className="relative container mx-auto max-w-7xl z-10 px-6 min-h-[calc(100vh_-_64px_-_108px)] mb-12 flex-grow">
                <Suspense fallback={<Loading />}>{children}</Suspense>
            </main>

            <div
                aria-hidden="true"
                className="fixed hidden dark:md:block dark:opacity-70 -bottom-[40%] -left-[20%] z-0"
            >
                <Image removeWrapper alt="docs left background" src="/gradients/docs-left.png" />
            </div>
            <div
                aria-hidden="true"
                className="fixed hidden dark:md:block dark:opacity-70 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] z-0 rotate-12"
            >
                <Image removeWrapper alt="docs right background" src="/gradients/docs-right.png" />
            </div>
        </>
    );
}

export default HomeLayout;