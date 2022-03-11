import { ViewListIcon } from "@heroicons/react/solid";
import SectionGridCampaign from "../containers/Section/SectionGridCampaign";

interface IProfileProptypes {
  avatar?: string | null;
  displayName: string;
  desc: string;
  email: string;
  href: string;
  jobName: string;
  bgImage: string;
  userType: string;
  campaignCreated?: any;
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
  campaignCreated,
}: IProfileProptypes): JSX.Element {
  return (
    <>
      {/* ! ------------------------------------------------------------
        ! Profile banner and avatar
        ! ------------------------------------------------------------ */}
      <div className="w-full">
        <div className="w-full h-48 bg-gray-600 rounded-t-lg">
          <img
            src={
              bgImage
                ? bgImage
                : "https://images.ctfassets.net/hrltx12pl8hq/5KiKmVEsCQPMNrbOE6w0Ot/341c573752bf35cb969e21fcd279d3f9/hero-img_copy.jpg?fit=fill&w=840&h=400&fm=webp"
            }
            className="object-cover w-full h-full"
          />
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
      <div className="flex flex-col p-5 pt-20 rounded-b-lg  bg-primary border-primary">
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

        {/* <div className="flex gap-8 pt-8">
          <div className="flex flex-col">
            <div className="w-32 h-5 mb-1 text-2xl">
              {campaignCreated.length}
            </div>
            <div className="w-32 h-5 mb-1 text-sm">Campaigns created</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Ⓝ donated</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Campaigns donated</div>
          </div>
          <div className="flex flex-col">
            <div className="w-20 h-5 mb-1 text-2xl">x</div>
            <div className="w-32 h-5 mb-1 text-sm">Campaigns liked</div>
          </div>
        </div> */}
        <div className="py-5 break-all bbcode">
          <div className=" text-neutral-100">
            {/* <div className="container relative "> */}
            <SectionGridCampaign
              className=""
              CampaignCardName="card11"
              heading="Created Campaigns"
              subHeading=""
              campaigns={campaignCreated}
              gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8"
            />
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
