
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Label from '../../components/Label';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useAppSelector } from '../../app/hooks';
import { selectLoginState, selectUserState } from '../../app/login/login';

type ListItemType = {
    name: string,
    link: string,
    icon?: JSX.Element,

    roundedTop?: boolean
}

export default function ProfilePage() {
    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    return (
        <>
            <ProfileLayout>
                <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">

                    <form className="grid gap-6 md:grid-cols-2" action="#" method="post">
                        <label className="block">
                            <Label>First name</Label>
                            <Input placeholder="Example Doe" type="text" className="mt-1" />
                        </label>
                        <label className="block">
                            <Label>Last name</Label>
                            <Input placeholder="Doe" type="text" className="mt-1" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label> Email address</Label>
                            <Input
                                type="email"
                                placeholder="example@example.com"
                                className="mt-1"
                            />
                        </label>
                        {loginState && userState?.type === "Unknown" &&
                            (
                                <>
                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Individual", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                                    }}>
                                        Pay storage fee (0.1 NEAR)
                                    </ButtonPrimary>

                                </>
                            )
                            || (
                                <>
                                    <ButtonPrimary className="md:col-span-2" type="submit">
                                        Update profile
                                    </ButtonPrimary>                                 </>
                            )}
                    </form>

                </div>

            </ProfileLayout>
        </>
    )
}
