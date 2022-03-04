interface IProfileProptypes {
    avatar?: string | null;
}

export default function Profile({ avatar }: IProfileProptypes): JSX.Element {
    return (<>
        {/* ! ------------------------------------------------------------
        ! Profile banner and avatar
        ! ------------------------------------------------------------ */}
        <div className="w-full">
            <div className="w-full h-48 bg-gray-600 rounded-t-lg animate-pulse"></div>
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
        <div className="flex flex-col p-5 pt-20 border rounded-b-lg bg-neutral-300 bg-primary border-primary">
            <div className="w-40 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
            <div className="h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse w-96"></div>
            <div className="mt-2 text-sm text-gray-200">
                <div className="flex flex-row items-center ml-auto space-x-2">
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                    <div className="w-1 h-1 bg-blue-200 rounded-full"></div>
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                </div>
            </div>

            <div className="flex gap-8 pt-8">
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                    <div className="w-20 h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
                </div>
            </div>
            <div className="py-5 break-all bbcode">
                <div className="h-5 mb-1 bg-gray-200 border border-gray-300 animate-pulse w-44"></div>
                <div className="w-full h-5 h-40 mb-1 bg-gray-200 border border-gray-300 animate-pulse"></div>
            </div>
        </div>
    </>)
}