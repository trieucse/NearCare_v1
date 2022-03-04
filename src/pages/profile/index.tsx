import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Profile from '../../components/Profile';
import { useAppSelector } from '../../app/hooks';
import { selectUserState } from '../../app/login/login';
import { NearAuthorType } from '../../data/types';
import axios from 'axios';
import { Widget } from '@uploadcare/react-widget';
import ButtonPrimary from '../../components/ButtonPrimary';
import { toast } from 'react-toastify';

export default function ProfilePage() {
    const userState = useAppSelector(selectUserState);

    const [avatar, setAvatar] = useState(null);

    const onAvatarChange: any = () => {
        e.preventDefault();

        axios
            .put("/api/user/change_avatar", { avatarUrl: avatar })
            .then((response) => {
                const { data } = response;
                if (data.success) {
                    toast.success("Thay avatar thành công");
                } else {
                    toast.error("Thay avatar không thành công");
                }
            });
    };

    const uploadToClient = (e: any) => {
        console.log(e);
        setAvatar(e.originalUrl);
        // setCreateObjectURL(URL.createObjectURL(e.originalUrl));
    };


    return (
        <>
            <ProfileLayout>
                <div className="flex flex-col items-center justify-center p-4">
                    {avatar && <img src={avatar} className="mb-3 w-96" />}
                    <Widget
                        publicKey="533d4b8f6a11de77ba81"
                        onChange={uploadToClient}
                        clearable
                    />
                    {avatar && (
                        <ButtonPrimary className="mt-4" onClick={onAvatarChange}>
                            Thay Avatar
                        </ButtonPrimary>
                    )}
                </div>

                <Profile />

            </ProfileLayout>
        </>
    )
}


