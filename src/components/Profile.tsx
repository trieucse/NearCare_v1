import { ViewListIcon } from "@heroicons/react/solid";

interface IProfileProptypes {
  avatar?: string | null;
  displayName: string;
  desc: string;
  email: string;
  href: string;
  jobName: string;
  bgImage: string;
  userType: string;
  campaignsDonated?: any;
}

export default function Profile({
  avatar,
  displayName,
  desc,
  email,
  href,
  jobName,
  bgImage,
  userType,
  campaignsDonated,
}: IProfileProptypes): JSX.Element {
  return (
    <>
      {/* ! ------------------------------------------------------------
        ! Profile banner and avatar
        ! ------------------------------------------------------------ */}
      <div className="w-full">
        <div className="w-full h-48 bg-gray-600 rounded-t-lg">
          <img src={bgImage} className="object-cover w-full h-full" />
        </div>
        <div className="absolute ml-5 -mt-20">
          <div
            className={
              "w-40 bg-gray-200 border border-b border-gray-300 rounded-lg shadow-md h-36 border-primary"
            }
          >
            {avatar && (
              <img src={avatar} className="object-cover w-full h-full" />
            )}
          </div>
        </div>
      </div>

      {/* ! ------------------------------------------------------------
        ! Profile general information
        ! ------------------------------------------------------------ */}
      <div className="flex flex-col p-5 pt-20 text-black border rounded-b-lg bg-neutral-300 bg-primary border-primary">
        <div className="w-40 text-2xl">{displayName || window.accountId}</div>
        <div className="mb-1 text-sm font-light w-96">
          {displayName && (
            <>
              {window.accountId} | {userType}
            </>
          )}
        </div>
        <div className="mt-2 text-sm">
          <div className="flex flex-row items-center ml-auto space-x-2">
            <div className="w-full h-5 mb-1 ">
              {desc && (
                <>
                  <b>Bio:</b>
                  <br />
                  {desc}
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-8 pt-8">
          <div className="flex flex-col">
            <div className="w-32 h-5 mb-1 text-2xl">
              {campaignsDonated.length}
            </div>
            <div className="w-32 h-5 mb-1 text-sm">Campaigns donated</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Ⓝ donated</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Project voted</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Project liked</div>
          </div>
        </div>
        <div className="py-5 break-all bbcode">
          <div className="mb-1 font-medium text-xl flex items-center gap-1">
            <ViewListIcon className="w-4 h-4" />
            Donated campaigns:
          </div>
          <div className="w-full h-40 mb-1">
            {campaignsDonated &&
              campaignsDonated.map((campaign: any) => (
                <div className="">
                  <a
                    //replace special characters or vietnamese character to url friendly
                    href={`/single-campaign/${campaign.title.replace(
                      /[^a-zA-Z0-9]/g,
                      "-"
                    )}/${campaign.campaign_id}`}
                    className="hover:text-pink-500"
                  >
                    {campaign.title}
                  </a>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
