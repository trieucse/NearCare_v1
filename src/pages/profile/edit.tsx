
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
import axios from 'axios';
import { Widget } from '@uploadcare/react-widget';
import { toast } from 'react-toastify';

import type { BaseUriContentType } from '../api/v1/user/ipfsUpdate';
import { Contract } from 'near-api-js';

export default function ProfilePage() {
    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    const { displayName, avatar, description, email, href, jobName, bgImage }: any = userState;

    // Fe = front end (what is displaying to the user)
    const [feAvatar, setFeAvatar] = React.useState<string | null>(avatar);
    const [feCover, setFeCover] = React.useState<string | null>(bgImage);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { description, displayName, email, href, jobName }: any = e.currentTarget.elements;

            const saveBaseURIData = () => new Promise(async (resolve) => {
                const { data } = await axios.post<BaseUriContentType>("/api/v1/user/ipfsUpdate", {
                    description: description.value,
                    displayName: displayName.value,
                    email: email.value,
                    href: href.value,
                    jobName: jobName.value,
                    avatar: feAvatar,
                    bgImage: feCover
                });

                resolve(data);
            });

            toast.promise(
                saveBaseURIData,
                {
                    pending: 'Uploading to IPFS...',
                    success: 'Data uploaded to IPFS... 👌',
                    error: 'Something wrong with the data 🤯'
                }
            )

            const base_uri_content = await saveBaseURIData();

            if (loginState && userState?.type === "Unknown") {
                await window.contract.register_user({ name: displayName, user_type: "Individual", base_uri_content, description }, 300000000000000, "100000000000000000000000")
                return;
            }

            await window.contract.update_user({ user_id: window.accountId, name: displayName, base_uri_content, description }, 300000000000000)
        } catch (error) {
            console.error(error)
        }
    }

    const uploadAvatarToClient = (e: any) => {
        console.log(e);

        setFeAvatar(e.originalUrl);
    };

    const uploadCoverPictureToClient = (e: any) => {
        console.log(e);

        setFeCover(e.originalUrl);
    }

    return (
        <>
            <ProfileLayout>
                <div className="p-2 rounded-xl md:border md:border-neutral-400 dark:border-neutral-800 md:p-6 ">
                    <form className="grid gap-6 md:grid-cols-2" onSubmit={onSubmit}>
                        <label className="block">
                            <Label>Avatar (optional)</Label>
                            <div className="flex flex-col items-center justify-center p-4">
                                {feAvatar && <img src={feAvatar} className="mb-3 w-96" />}
                                <div className='uploader-blue-button'>
                                    <Widget
                                        publicKey="533d4b8f6a11de77ba81"
                                        onChange={uploadAvatarToClient}
                                        clearable
                                    />
                                </div>
                            </div>
                        </label>

                        <label className="block">
                            <Label>Cover picture (optional)</Label>
                            <div className="flex flex-col items-center justify-center p-4">
                                {feCover && <img src={feCover} className="mb-3 w-96" />}
                                <div className='uploader-blue-button'>
                                    <Widget
                                        publicKey="533d4b8f6a11de77ba81"
                                        onChange={uploadCoverPictureToClient}
                                        clearable
                                    />
                                </div>
                            </div>
                        </label>
                        <label className="block">
                            <Label>Display name (optional)</Label>
                            <Input placeholder="Example Doe" defaultValue={displayName} type="text" className="mt-1" name="displayName" />
                        </label>
                        <label className="block">
                            <Label>Email (optional)</Label>
                            <Input placeholder="johndoe@gmail.com" defaultValue={email} type="email" className="mt-1" name="email" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label>Website (optional)</Label>
                            <Input placeholder="johndoe.com" defaultValue={href} className="mt-1" name="href" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label>Job name (optional)</Label>
                            <Input placeholder="johndoe.com" defaultValue={jobName} className="mt-1" name="jobName" />
                        </label>
                        <label className="block md:col-span-2">
                            <Label> Description (optional)</Label>
                            <Textarea
                                placeholder="example@example.com"
                                className="mt-1"
                                name="description"
                                defaultValue={description}
                            />
                        </label>

                        <ButtonPrimary className="md:col-span-2" type="submit"> Update profile
                        </ButtonPrimary>
                    </form>

                </div>

            </ProfileLayout>

            <style> {
                `.uploader-blue-button .uploadcare--widget__button_type_open {
                    background-color: #4287f5;
                }

                .uploader-blue-button .uploadcare--widget__button_type_open:hover {
                    opacity: 0.9;
                }`
            }
            </style>
        </>
    )
}
