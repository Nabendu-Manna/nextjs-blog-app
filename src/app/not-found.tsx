"use client";

import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full">
            <div className="text-center">
                <div className="inline-flex">
                    <Image
                        src="/404-animate.svg"
                        alt="404 error"
                        className="w-full h-min"
                        width={100}
                        height={24}
                        priority
                    />
                </div>
                <p className="text-slate-600 mt-5 lg:text-lg">
                    The page you are looking for doesn&apos;t exist or has been removed.
                </p>
                {/* <Link color="primary" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" href="/">
                    
                </Link> */}

                <Link href="/" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Go to Home</Link>

            </div>
        </div>
    );
}