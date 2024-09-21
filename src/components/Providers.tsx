"use client";

import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import AppNavbar from "@/components/navbar/AppNavbar";
import StoreProvider from '@/components/StoreProvider';

export function Providers({ children, ...themeProps }: ThemeProviderProps) {
    const router = useRouter();

    return (
        <>
            <StoreProvider>
                <NextUIProvider navigate={router.push}>
                    <NextThemesProvider {...themeProps}>
                        <AppNavbar />
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </StoreProvider>
        </>
    );
}