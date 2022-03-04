import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Profile from '../../components/Profile';
import { useAppSelector } from '../../app/hooks';
import { selectUserState } from '../../app/login/login';
import { NearAuthorType } from '../../data/types';

export default function ProfilePage() {
    const userState = useAppSelector(selectUserState);

    return (
        <>
            <ProfileLayout>
                <Profile />

            </ProfileLayout>
        </>
    )
}


