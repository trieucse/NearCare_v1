
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React from 'react';

type ListItemType = {
    name: string,
    link: string,
    icon?: JSX.Element,

    roundedTop?: boolean
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    let navigationItems: ListItemType[] = [
        {
            name: 'Profile',
            link: '/profile',
            roundedTop: true,
            icon: <TagIcon className="w-4 h-4" />
        },
        {
            name: 'Edit profile',
            link: '/profile/edit',
            icon: <TagIcon className="w-4 h-4" />
        },
        {
            name: 'Verify',
            link: '/profile/kyc',
            icon: <TagIcon className="w-4 h-4" />
        }
    ]

    return (
        <>
            <div className="flex flex-col gap-1 py-10 mx-auto md:flex-row max-w-7xl">
                <div className="self-start w-full text-white rounded-t-lg md:w-80">
                    {navigationItems.map((item, index) => (
                        <ListItem key={index} {...item} />
                    ))}
                </div>
                <div className="flex-grow w-full">
                    {children}
                </div>
            </div>

        </>
    )
}

const ListItem = (item: ListItemType) => {
    let roundedTop = item.roundedTop ? 'rounded-t-lg' : '';

    return (
        <Link href={item.link}>
            <a className={`${roundedTop} flex items-center gap-1 p-2 text-sm text-white transition duration-75 bg-neutral-400 hover:bg-neutral-700 `}>
                {item.icon}
                {item.name}
            </a>
        </Link>
    )
}
