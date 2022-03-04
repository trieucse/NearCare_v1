
import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Label from '../../components/Label';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useAppSelector } from '../../app/hooks';
import { selectLoginState, selectUserState } from '../../app/login/login';
import Textarea from '../../components/Textarea';

type ListItemType = {
    name: string,
    link: string,
    icon?: JSX.Element,

    roundedTop?: boolean
}

export default function ProfilePage() {
    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        throw new Error('Not implemented');

        e.preventDefault();

        //console.log all the inputs
        // console.log(e.currentTarget.elements);

        alert(e.currentTarget.elements);
        if (loginState && userState?.type === "Unknown") {
            // window.contract.register_user({

            window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Individual", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
            // })
            return;
        }

        window.contract.update_user({ name: "Trung Tin Nguyen", user_type: "Individual", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
    }

    return (
        <>
            <ProfileLayout>
                <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                    <form className="grid gap-6 md:grid-cols-2" onSubmit={onSubmit}>
                        <label className="block">
                            <Label>Display name (optional)</Label>
                            <Input placeholder="Example Doe" type="text" className="mt-1" name="displayName" />
                        </label>
                        <label className="block">
                            <Label>Email (optional)</Label>
                            <Input placeholder="johndoe@gmail.com" type="email" className="mt-1" name="email" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label>Website (optional)</Label>
                            <Input placeholder="johndoe.com" className="mt-1" name="href" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label>Jobname (optional)</Label>
                            <Input placeholder="johndoe.com" className="mt-1" name="jobName" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label> Description (optional)</Label>
                            <Textarea
                                placeholder="example@example.com"
                                className="mt-1"
                            />
                        </label>

                        <ButtonPrimary className="md:col-span-2" type="submit"> Update profile
                        </ButtonPrimary>
                    </form>

                </div>

            </ProfileLayout>
        </>
    )
}
