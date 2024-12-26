"use client";

import React from "react";
import { Button, Link } from "@nextui-org/react";
import Icon from "@/components/Icon";

export default function LeftSideBar() {

    const links = [
        { label: 'Home', link: '', icon: <Icon name="house" strokeWidth={1.25} /> },
        { label: 'Bookmarks', link: 'bookmarks', icon: <Icon name="bookmark" strokeWidth={1.25} /> },
        { label: 'Liked', link: 'liked', icon: <Icon name="thumbs-up" strokeWidth={1.25} /> },
        { label: 'Tags', link: 'tags', icon: <Icon name="tags" strokeWidth={1.25} /> },
        { label: 'Notifications', link: 'notifications', icon: <Icon name="bell" strokeWidth={1.25} /> },
        { label: 'Create', link: 'create', icon: <Icon name="square-plus" strokeWidth={1.25} /> },
        { label: 'About', link: 'about', icon: <Icon name="user-round" strokeWidth={1.25} /> },
        { label: 'Report', link: 'report', icon: <Icon name="message-circle-warning" strokeWidth={1.25} /> },
        { label: 'Settings', link: 'settings', icon: <Icon name="settings" strokeWidth={1.25} /> },
    ]

    return (
        <div className="grid grid-cols-1 gap-2 z-0 ">
            {links.map((link, index) => (
                <Button as={Link} color="default" variant="light" radius="lg" className="flex flex-row justify-start" fullWidth key={`${link.label}-${index}`}>
                    {link.icon} {link.label}
                </Button>
            ))}
        </div>
    );
}