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
import { Data as VolunteerDataResponse } from '../api/v1/user/ipfsVolunteerUpload';
import { Data as CompanyDataResponse } from '../api/v1/user/ipfsCompanyUpload';
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
                {loginState && (userState?.type === "Unknown" || userState?.type === "Individual") &&
                    (<>
                        {/* REGISTER ACCOUNT */}

                        <div className="">
                            <div className="flex flex-col max-w-6xl gap-1 mx-auto md:flex-row">
                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-liza-summer-6348123.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        // window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Volunteer", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "100000000000000000000000", "1000000000000000000000000")
                                        setVolunteerIsOpen(true)
                                    }}>
                                        Register as Volunteer account
                                    </ButtonPrimary>
                                </div>

                                <div className="flex flex-col flex-1 gap-1">
                                    <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-rodnae-productions-6646916.jpg" />

                                    <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                        // window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "100000000000000000000000", "1000000000000000000000000")
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
                                    Your role is: {userState?.type}
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



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => { }}
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
                        <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-700">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Register as Volunteer account
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Please fill in the form below to register as a volunteer account.
                                </p>

                                <VolunteerForm
                                    closeModal={closeModal}
                                />

                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

function VolunteerForm({ closeModal }: { closeModal: () => void }) {
    // Fe = front end (what is displaying to the user)
    const [passport, setPassport] = React.useState("");

    const uploadAvatarToClient = (e: any) => {
        console.log(e);

        setPassport(e.originalUrl);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { name, email, note, jobName }: any = e.currentTarget.elements;

            const saveBaseURIData = () => new Promise<any>(async (resolve, reject) => {
                try {

                    const { data } = await axios.post<VolunteerDataResponse>("/api/v1/user/ipfsVolunteerUpload", {
                        passport: passport,
                        name: name.value,
                        email: email.value,
                        note: note.value,
                        jobName: jobName.value,
                    });

                    resolve(data.metadata);
                }
                catch (e) {
                    reject(e);
                }
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

            await window.contract.create_request(
                { request_type: "VolunteerRequest", base_uri_content }, 300000000000000, "100000000000000000000000"
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form className="grid gap-6 md:grid-cols-2 dark:text-white" onSubmit={onSubmit}>
                <label className="block col-span-1">
                    <Label>Passport <br />(with the text: nearcare ID: {window.accountId})</Label>
                    <div className="flex flex-col items-center justify-center p-4">
                        {passport && <img src={passport} className="mb-3 w-96" />}
                        <div className='uploader-blue-button'>
                            <Widget
                                publicKey="533d4b8f6a11de77ba81"
                                onChange={uploadAvatarToClient}
                                clearable
                            />
                        </div>
                    </div>
                </label>
                <div>
                    <img src="/images/kyc.png" />
                </div>

                <label className="block">
                    <Label>Name</Label>
                    <Input placeholder="Example Doe" type="text" className="mt-1" name="name" />
                </label>
                <label className="block">
                    <Label>Email</Label>
                    <Input placeholder="johndoe@gmail.com" type="email" className="mt-1" name="email" />
                </label>
                <label className="block md:col-span-2">
                    <Label>Job name</Label>
                    <Input placeholder="johndoe.com" className="mt-1" name="jobName" />
                </label>
                <label className="block md:col-span-2">
                    <Label> Note</Label>
                    <Textarea
                        placeholder="example@example.com"
                        className="mt-1"
                        name="note"

                    />
                </label>

                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
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



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => { }}
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
                        <div className="inline-block w-full max-w-5xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl dark:bg-neutral-700">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 dark:text-white"
                            >
                                Register as Volunteer account
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Please fill in the form below to register as a volunteer account.
                                </p>

                                <CompanyForm
                                    closeModal={closeModal}
                                />

                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

function CompanyForm({ closeModal }: { closeModal: () => void }) {
    // Fe = front end (what is displaying to the user)
    const [passport, setPassport] = React.useState("");

    const uploadAvatarToClient = (e: any) => {
        console.log(e);

        setPassport(e.originalUrl);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const { name, email, note, jobName }: any = e.currentTarget.elements;

            const saveBaseURIData = () => new Promise<any>(async (resolve, reject) => {
                try {

                    const { data } = await axios.post<CompanyDataResponse>("/api/v1/user/ipfsVolunteerUpload", {
                        passport: passport,
                        name: name.value,
                        email: email.value,
                        note: note.value,
                        jobName: jobName.value,
                    });

                    resolve(data.metadata);
                }
                catch (e) {
                    reject(e);
                }
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

            await window.contract.create_request(
                { request_type: "CompanyRequest", base_uri_content }, 300000000000000, "100000000000000000000000"
            )
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form className="grid gap-6 md:grid-cols-2 dark:text-white" onSubmit={onSubmit}>
                <label className="block col-span-1">
                    <Label>Passport <br />(with the text: nearcare ID: {window.accountId})</Label>
                    <div className="flex flex-col items-center justify-center p-4">
                        {passport && <img src={passport} className="mb-3 w-96" />}
                        <div className='uploader-blue-button'>
                            <Widget
                                publicKey="533d4b8f6a11de77ba81"
                                onChange={uploadAvatarToClient}
                                clearable
                            />
                        </div>
                    </div>
                </label>
                <div>
                    <img src="/images/kyc.png" />
                </div>

                <label className="block">
                    <Label>Name</Label>
                    <Input placeholder="Example Doe" type="text" className="mt-1" name="name" />
                </label>
                <label className="block">
                    <Label>Email</Label>
                    <Input placeholder="johndoe@gmail.com" type="email" className="mt-1" name="email" />
                </label>
                <label className="block md:col-span-2">
                    <Label>Job name</Label>
                    <Input placeholder="johndoe.com" className="mt-1" name="jobName" />
                </label>
                <label className="block md:col-span-2">
                    <Label> Note</Label>
                    <Textarea
                        placeholder="example@example.com"
                        className="mt-1"
                        name="note"

                    />
                </label>

                <div className="flex gap-2 mt-4">
                    <button
                        type="submit"
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
