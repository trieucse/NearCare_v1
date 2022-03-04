import Link from 'next/link';
import { TagIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import ProfileLayout from "../../components/profile/ProfileLayout";
import Label from '../../components/Label';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import { useAppSelector } from '../../app/hooks';
import { selectLoginState, selectUserState } from '../../app/login/login';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { Dialog, Transition } from '@headlessui/react'
import { BaseUriContentType } from '../api/v1/user/ipfsUpdate';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Widget } from '@uploadcare/react-widget';
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

    const [volunteerIsOpen, setVolunteerIsOpen] = useState(false)
    const [companyIsOpen, setCompanyIsOpen] = useState(false)

    return (
        <>
            <VolunteerFormDialog
                isOpen={volunteerIsOpen}
                setIsOpen={setVolunteerIsOpen}
            />
            <CompanyFormDialog
                isOpen={companyIsOpen}
                setIsOpen={setCompanyIsOpen}
            />
            <ProfileLayout>
                {loginState && userState?.type === "Unknown" &&
                    (<>
                        {/* REGISTER ACCOUNT */}

                        <div className="">
                            <div className="flex flex-col max-w-6xl gap-1 mx-auto md:flex-row">
                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-liza-summer-6348123.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        // window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Volunteer", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                                        setVolunteerIsOpen(true)
                                    }}>
                                        Register as Volunteer account
                                    </ButtonPrimary>
                                </div>

                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-rodnae-productions-6646916.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        // window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                                        setCompanyIsOpen(true)
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

function VolunteerFormDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >

                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Register as Volunteer account
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Please fill in the form below to register as a volunteer account.
                                </p>

                                <VolunteerForm></VolunteerForm>

                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                >
                                    Send request
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

function VolunteerForm() {
    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    // get from userState, "" as default
    const { displayName, avatar, desc, email, href, jobName, bgImage } = userState || {};

    // Fe = front end (what is displaying to the user)
    const [feAvatar, setFeAvatar] = React.useState(avatar);
    const [feCover, setFeCover] = React.useState(bgImage);

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
                        defaultValue={desc}
                    />
                </label>

            </form>

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

function CompanyForm() {
    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    // get from userState, "" as default
    const { displayName, avatar, desc, email, href, jobName, bgImage } = userState || {};

    // Fe = front end (what is displaying to the user)
    const [feAvatar, setFeAvatar] = React.useState(avatar);
    const [feCover, setFeCover] = React.useState(bgImage);

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
                        defaultValue={desc}
                    />
                </label>

            </form>

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

function CompanyFormDialog({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >

                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900"
                            >
                                Register as Company account
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    Please fill in the form below to register as a company account.
                                </p>

                                <CompanyForm />

                            </div>

                            <div className="flex gap-2 mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                >
                                    Send request
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
