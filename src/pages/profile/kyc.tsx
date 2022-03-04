import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Label from '../../components/Label';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useAppSelector } from '../../app/hooks';
import { selectLoginState, selectUserState } from '../../app/login/login';
import { BadgeCheckIcon } from '@heroicons/react/solid';

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
                {loginState && userState?.type === "Unknown" &&
                    (<>
                        {/* REGISTER ACCOUNT */}

                        <div className="">
                            <div className="flex flex-col max-w-6xl gap-1 mx-auto md:flex-row">
                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-liza-summer-6348123.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Volunteer", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                                    }}>
                                        Register as Volunteer account
                                    </ButtonPrimary>
                                </div>

                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-rodnae-productions-6646916.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                                    }}>
                                        Register as Company account
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </div>
                    </>)}

                {userState?.type !== "Unknown" &&
                    // already verified
                    (<>
                        <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
                            <div className="flex flex-col max-w-6xl gap-1 mx-auto md:flex-row">
                                <div className="flex items-center flex-1 gap-1">
                                    <BadgeCheckIcon className="w-6 h-6 text-green-600" />
                                    You are verified as {userState?.type}
                                </div>
                            </div>
                        </div>
                    </>
                    )}

            </ProfileLayout>
        </>
    )
}
