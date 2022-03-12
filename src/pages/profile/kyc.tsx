import Link from "next/link";
import { TagIcon } from "@heroicons/react/outline";
import React, { Fragment, useEffect, useState } from "react";
import ProfileLayout from "../../components/profile/ProfileLayout";
import Label from "../../components/Label";
import Input from "../../components/Input";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState, selectUserState } from "../../app/login/login";
import { BadgeCheckIcon, CheckIcon } from "@heroicons/react/solid";
import { Dialog, Transition } from "@headlessui/react";
import { Data as VolunteerDataResponse } from "../api/v1/user/ipfsVolunteerUpload";
import { Data as CompanyDataResponse } from "../api/v1/user/ipfsCompanyUpload";
import axios from "axios";
import { toast } from "react-toastify";
import { Widget } from "@uploadcare/react-widget";
import Textarea from "../../components/Textarea";
import ButtonSecondary from "../../components/ButtonSecondary";
import { useRouter } from "next/router";
import { GAS, STAKING_STORAGE_AMOUNT } from "../../utils/utils";

type ListItemType = {
  name: string;
  link: string;
  icon?: JSX.Element;

  roundedTop?: boolean;
};

export interface PricingItem {
  isPopular: boolean;
  image: string;
  title: string;
  desc: string;
  per: string;
  features: string[];
}

const pricings: PricingItem[] = [
  {
    isPopular: true,
    image: "/images/pexels-liza-summer-6348123.jpg",
    title: "Individual",
    per: "/mo",
    features: [
      "Campaign Create",
      "Donate",
      "Request Donation",
      "Create Auction(kyc)",
      "withral Donation(kyc)",
    ],
    desc: ` `,
  },
  {
    isPopular: false,
    title: "Volunteer",
    image: "/images/pexels-rodnae-productions-6646916.jpg",

    per: "/mo",
    features: [
      "Campaign Create",
      "Donate",
      "Charity Auction",
      "Vote Campaign",
      "Approve Campaign",
      "Get NFT certificate",
      "withral salary(kyc)",
    ],
    desc: ` `,
  },
  {
    isPopular: false,
    image: "/images/individual-concept-46902823.jpg",
    title: "Company",

    per: "/mo",
    features: [
      "Campaign Create",
      "Donate",
      "Charity Auction",
      "Claim NFT certificate",
      "Honors",
    ],
    desc: ``,
  },
];

export default function ProfilePage() {
  const loginState = useAppSelector(selectLoginState);
  const userState = useAppSelector(selectUserState);
  const router = useRouter();

  const [volunteerIsOpen, setVolunteerIsOpen] = useState(false);
  const [companyIsOpen, setCompanyIsOpen] = useState(false);

  useEffect(() => {
    if (!loginState) {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [loginState]);

  const renderPricingItem = (pricing: PricingItem, index: number) => {
    return (
      <div
        key={index}
        className={`h-full relative px-6 py-8 rounded-3xl border-2 flex flex-col overflow-hidden ${
          pricing.isPopular
            ? "border-primary-500"
            : "border-neutral-100 dark:border-neutral-700"
        }`}
      >
        {pricing.isPopular && (
          <span className="bg-primary-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
            Default
          </span>
        )}
        <div className="mb-8">
          <h2 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
            {pricing.title}
          </h2>
          <img
            className="rounded-md shadow-md object-cover w-full bg-center object-top h-[20rem]"
            src={pricing.image}
          />
        </div>
        <nav className="space-y-4 mb-8">
          {pricing.features.map((item, index) => (
            <li className="flex items-center" key={index}>
              <span className="mr-4 inline-flex flex-shrink-0 text-primary-6000">
                <CheckIcon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="text-neutral-700 dark:text-neutral-300">
                {item}
              </span>
            </li>
          ))}
        </nav>
        <div className="flex flex-col mt-auto">
          {pricing.isPopular ? (
            <> </>
          ) : (
            // <ButtonSecondary>
            //   <span className="font-medium">Register</span>
            // </ButtonSecondary>
            <ButtonPrimary
              onClick={() => {
                // window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "100000000000000000000000", "1000000000000000000000000")
                {
                  pricing.title === "Company"
                    ? setCompanyIsOpen(true)
                    : setVolunteerIsOpen(true);
                }
              }}
            >
              Register
            </ButtonPrimary>
          )}
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
            {pricing.desc}
          </p>
        </div>
      </div>
    );
  };

  return (
    <>
      <VolunteerFormDialog
        isOpen={volunteerIsOpen}
        setIsOpen={setVolunteerIsOpen}
      />
      <CompanyFormDialog isOpen={companyIsOpen} setIsOpen={setCompanyIsOpen} />
      <ProfileLayout>
        {loginState &&
          (userState?.type === "Unknown" ||
            userState?.type === "Individual") && (
            <>
              <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
                <div className="grid lg:grid-cols-3 gap-5 xl:gap-8">
                  {pricings.map(renderPricingItem)}
                </div>
              </section>
            </>
          )}

        {userState?.type !== "Unknown" && (
          // already verified
          <>
            <br />
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
  );
}

function VolunteerFormDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
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
                  Please fill in the form below to register as a volunteer
                  account.
                </p>

                <VolunteerForm closeModal={closeModal} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
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

      const saveBaseURIData = () =>
        new Promise<any>(async (resolve, reject) => {
          try {
            const { data } = await axios.post<VolunteerDataResponse>(
              "/api/v1/user/ipfsVolunteerUpload",
              {
                passport: passport,
                name: name.value,
                email: email.value,
                note: note.value,
                jobName: jobName.value,
              }
            );

            resolve(data.metadata);
          } catch (e) {
            reject(e);
          }
        });

      toast.promise(saveBaseURIData, {
        pending: "Uploading to IPFS...",
        success: "Data uploaded to IPFS... 👌",
        error: "Something wrong with the data 🤯",
      });

      const base_uri_content = await saveBaseURIData();

      await window.contract.create_request(
        { request_type: "VolunteerRequest", base_uri_content },
        GAS,
        STAKING_STORAGE_AMOUNT
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="grid gap-6 md:grid-cols-2 dark:text-white"
        onSubmit={onSubmit}
      >
        <label className="block col-span-1">
          <Label>
            Passport <br />
            (with the text: nearcare ID: {window.accountId})
          </Label>
          <div className="flex flex-col items-center justify-center p-4">
            {passport && <img src={passport} className="mb-3 w-96" />}
            <div className="uploader-blue-button">
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
          <Input
            placeholder="Example Doe"
            type="text"
            className="mt-1"
            name="name"
          />
        </label>
        <label className="block">
          <Label>Email</Label>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            className="mt-1"
            name="email"
          />
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

      <style>
        {" "}
        {`.uploader-blue-button .uploadcare--widget__button_type_open {
                    background-color: #4287f5;
                }

                .uploader-blue-button .uploadcare--widget__button_type_open:hover {
                    opacity: 0.9;
                }`}
      </style>
    </>
  );
}

function CompanyFormDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => {}}
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
                Register as Company account
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Please fill in the form below to register as a company
                  account.
                </p>

                <CompanyForm closeModal={closeModal} />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
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

      const saveBaseURIData = () =>
        new Promise<any>(async (resolve, reject) => {
          try {
            const { data } = await axios.post<CompanyDataResponse>(
              "/api/v1/user/ipfsVolunteerUpload",
              {
                passport: passport,
                name: name.value,
                email: email.value,
                note: note.value,
                jobName: jobName.value,
              }
            );

            resolve(data.metadata);
          } catch (e) {
            reject(e);
          }
        });

      toast.promise(saveBaseURIData, {
        pending: "Uploading to IPFS...",
        success: "Data uploaded to IPFS... 👌",
        error: "Something wrong with the data 🤯",
      });

      const base_uri_content = await saveBaseURIData();

      await window.contract.create_request(
        { request_type: "CompanyRequest", base_uri_content },
        GAS,
        STAKING_STORAGE_AMOUNT
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        className="grid gap-6 md:grid-cols-2 dark:text-white"
        onSubmit={onSubmit}
      >
        <label className="block col-span-1">
          <Label>
            Passport <br />
            (with the text: nearcare ID: {window.accountId})
          </Label>
          <div className="flex flex-col items-center justify-center p-4">
            {passport && <img src={passport} className="mb-3 w-96" />}
            <div className="uploader-blue-button">
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
          <Input
            placeholder="Example Doe"
            type="text"
            className="mt-1"
            name="name"
          />
        </label>
        <label className="block">
          <Label>Email</Label>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            className="mt-1"
            name="email"
          />
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

      <style>
        {" "}
        {`.uploader-blue-button .uploadcare--widget__button_type_open {
                    background-color: #4287f5;
                }

                .uploader-blue-button .uploadcare--widget__button_type_open:hover {
                    opacity: 0.9;
                }`}
      </style>
    </>
  );
}
