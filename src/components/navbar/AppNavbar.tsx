"use client";

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { Kbd } from "@nextui-org/react";
import Icon from "@/components/Icon";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function AppNavbar() {
    const { theme, setTheme } = useTheme();

    const onChange = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
    }

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    const icons = {
        chevron: <Icon name="chevron-down" />,
        code: <Icon name="code" color="#038aff" />,
        git: <Icon name="folder-git-2" color="#f03434" />,
        brain: <Icon name="brain-circuit" color="#fff000" />,
        database: <Icon name="database" color="#ff9470" />,
        server: <Icon name="server-cog" color="#3fc380" />
    };

    const navLinks = [{}];

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth={'xl'}>
            <NavbarContent className="basis-1/5 sm:basis-0 -ml-2" justify="start">
                <NavbarBrand as="li" className="md:gap-3 max-w-fit">
                    <Image
                        src="/logo.svg"
                        alt="404 error"
                        className=""
                        width={35}
                        height={35}
                        priority
                    />
                    <p className="font-bold text-foreground-900">Blog</p>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="gap-2" justify="end">
                <NavbarItem className="hidden sm:flex"> {/* isActive */}
                    <Dropdown>
                        <DropdownTrigger>
                            <Button disableRipple className="p-0 bg-transparent data-[hover=true]:bg-transparent" endContent={icons.chevron} radius="sm" variant="light">
                                About
                            </Button>
                        </DropdownTrigger>

                        <DropdownMenu
                            aria-label="ACME features"
                            className="w-[340px]"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="autoscaling"
                                description="ACME scales apps to meet user demand, automagically, based on load."
                                startContent={icons.code}
                            >
                                Autoscaling
                            </DropdownItem>
                            <DropdownItem
                                key="usage_metrics"
                                description="Real-time metrics to debug issues. Slow query added? We’ll show you exactly where."
                                startContent={icons.git}
                            >
                                Usage Metrics
                            </DropdownItem>
                            <DropdownItem
                                key="production_ready"
                                description="ACME runs on ACME, join us and others serving requests at web scale."
                                startContent={icons.brain}
                            >
                                Production Ready
                            </DropdownItem>
                            <DropdownItem
                                key="99_uptime"
                                description="Applications stay on the grid with high availability and high uptime guarantees."
                                startContent={icons.server}
                            >
                                +99% Uptime
                            </DropdownItem>
                            <DropdownItem
                                key="supreme_support"
                                description="Overcome any challenge with a supporting team ready to respond."
                                startContent={icons.database}
                            >
                                +Supreme Support
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarItem>

                <NavbarItem className="hidden sm:flex">
                    <Link color="foreground" href="#">
                        Contact
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Button isIconOnly size="sm" radius="lg" variant="flat" className="flex p-0" onClick={onChange}>
                        {theme === "light" ? (<Icon name="moon" fill="blue" color="blue" />) : (<Icon name="sun" fill="yellow" color="yellow" />)}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size="sm" radius="lg" variant="flat" className="hidden md:flex px-1.5">
                        <Icon name="search" strokeWidth={1.25} /> Search <Kbd keys={["command"]}>K</Kbd>
                    </Button>
                    <Button isIconOnly size="sm" radius="lg" variant="flat" className="flex md:hidden p-0">
                        <Icon name="search" strokeWidth={1.25} />
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} href="#" color="primary" variant="ghost" size="sm" radius="lg">
                        Sign In
                    </Button>
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button as={Link} href="#" color="primary" variant="solid" size="sm" radius="lg">
                        Sign Up
                    </Button>
                </NavbarItem>

                <NavbarItem className="w-10 h-full sm:hidden">
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="w-full h-full text-foreground"
                    />
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}