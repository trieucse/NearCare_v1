interface IProfileProptypes {
    avatar?: string | null;
    displayName: string;
    desc: string;
    email: string;
    href: string;
    jobName: string;
    bgImage: string;
}

export default function Profile({
    avatar,
    displayName,
    desc,
    email,
    href,
    jobName,
    bgImage
}: IProfileProptypes): JSX.Element {
    return (<>
        {/* ! ------------------------------------------------------------
        ! Profile banner and avatar
        ! ------------------------------------------------------------ */}
        <div className="w-full">
            <div className="w-full h-48 bg-gray-600 rounded-t-lg">
                <img src={bgImage} className="object-cover w-full h-full" />

            </div>
            <div className="absolute ml-5 -mt-20">
                <div className={"w-40 bg-gray-200 border border-b border-gray-300 rounded-lg shadow-md h-36 border-primary"}>
                    {avatar &&
                        <img src={avatar} className="object-cover w-full h-full" />
                    }
                </div>
            </div>
        </div>

        {/* ! ------------------------------------------------------------
        ! Profile general information
        ! ------------------------------------------------------------ */}
        <div className="flex flex-col p-5 pt-20 text-black border rounded-b-lg bg-neutral-300 bg-primary border-primary">
            <div className="w-40 h-5 mb-1 text-2xl">
                {displayName}
            </div>
            <div className="h-5 mb-1 text-sm w-96">
                {window.accountId}
            </div>
            <div className="mt-2 text-sm">
                <div className="flex flex-row items-center ml-auto space-x-2">
                    <div className="w-full h-5 mb-1 ">
                        <b>
                            Bio:
                        </b><br />
                        {desc}
                    </div>
                </div>
            </div>

            <div className="flex gap-8 pt-8">
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1">
                        100
                    </div>
                    <div className="w-32 h-5 mb-1 text-sm">
                        Projects donated
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-32 h-5 mb-1 text-sm">
                        200
                    </div>
                    <div className="w-32 h-5 mb-1 text-sm">
                        Money donated
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1">300</div>
                    <div className="w-32 h-5 mb-1 text-sm">
                        Project voted
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1">400</div>
                    <div className="w-32 h-5 mb-1 text-sm">
                        Project liked
                    </div>
                </div>
            </div>
            <div className="py-5 break-all bbcode">
                <div className="h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse w-44"></div>
                <div className="w-full h-5 h-40 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
            </div>
        </div>
    </>)
}