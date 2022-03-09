import Heading from "../components/Heading";
import NcImage from "../components/NcImage";
import React from "react";
import tinavata from "../images/tin.png";
import travata from "../images/trieu.jpg";

export interface People {
  id: string;
  name: string;
  job: string;
  avatar: string;
}

const AD_DEMO: People[] = [
  {
    id: "1",
    name: `Dinh Ngoc Thanh`,
    job: "Technology Advisor(GFS)",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/185196723_4451805521515329_1759260388488869770_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=yie8QppcV3MAX9t45m8&_nc_ht=scontent-nrt1-1.xx&oh=00_AT-Qrl10ZZqEMiqG8-b1jQAmyl_k9taObLjVOLSO19AoBg&oe=624DAAD0",
  },
  {
    id: "1",
    name: `Pham Huong`,
    job: "Founder GFS Ventures",
    avatar:
      "https://static2.yan.vn/YanNews/2167221/202110/pham-van-huong-chia-se-mong-muon-ho-tro-cac-developer-tiep-can-nen-cong-nghiep-blockchain-fb78481c.jpg",
  },
  {
    id: "1",
    name: `Vu Nguyen`,
    job: "IT Team Leader",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/179657371_1983803728425270_13334256673797480_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=SD0M2H82ZMEAX-6L1AJ&_nc_ht=scontent-nrt1-1.xx&oh=00_AT8UZCb0_8R8EFJH3V0kn0QUGurJiU1A70a39BiSvrSvCg&oe=624E249A",
  },
];

const FOUNDER_DEMO: People[] = [
  {
    id: "1",
    name: `Trieu Mai`,
    job: "Co-founder and Developer",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/274279964_1147395382701994_7562099538738075746_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=Q7OWhnZlGMQAX-qI7Xa&tn=w1TraXsU_sAixnIZ&_nc_ht=scontent-nrt1-1.xx&oh=00_AT-LSEwLKlleuboY9sIPrzhUO6ebwx6HDlLDm-ipMTAjjg&oe=622D1E31",
  },
  {
    id: "2",
    name: `Tin Nguyen`,
    job: "Co-founder and Developer",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-1/246043083_1499392740430475_7226278114297106613_n.jpg?stp=dst-jpg_p200x200&_nc_cat=104&ccb=1-5&_nc_sid=7206a8&_nc_ohc=EBtED5tc0fUAX8ehJsk&_nc_ht=scontent-nrt1-1.xx&oh=00_AT-ICi8c0xDrzJC3roV27Rt35AIq2qsu46H0NMVOQdBXdg&oe=622DDAC6",
  },
  {
    id: "3",
    name: `Hung Nicolas`,
    job: "adviser",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/253197246_1522223204806658_3839703132333872862_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=fvSsjStkU9IAX8isp75&_nc_ht=scontent-nrt1-1.xx&oh=00_AT_cYQde2aB19i5G7KfW0p1hjaSlBs1efdOzb_AsDCVlKA&oe=622E22D5",
  },
  {
    id: "4",
    name: `Duong Thuy`,
    job: "Operations",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-1/275065616_6541550502535193_4357423396965339219_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NJ5WvVWpNi4AX9fioOP&_nc_ht=scontent-nrt1-1.xx&oh=00_AT8S3XBAS6rnhtHhU7bsdVqH4HWwfJ_qZegyi0Jm30OxqQ&oe=622D21F6",
  },
  {
    id: "5",
    name: `Vi Le`,
    job: "Community",
    avatar:
      "https://scontent.xx.fbcdn.net/v/t39.30808-1/273551988_3273422342879996_56140925707200690_n.jpg?stp=dst-jpg_p100x100&_nc_cat=102&ccb=1-5&_nc_sid=dbb9e7&_nc_ohc=lEadeF6Er3kAX_Mo-FC&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=00_AT_UBgvgVgyKpxBrl4-tz6L6uahkn7vyk9SZtOuzUb2d7A&oe=622CCE5E",
  },
  {
    id: "6",
    name: `Hung Nguyen`,
    job: "Leader",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/262119599_4474747952636201_1976547577941020197_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=174925&_nc_ohc=SjWzep7tDgMAX-HJsu0&_nc_ht=scontent-nrt1-1.xx&oh=00_AT_8yPc4yLd2t2eApY1ary0mxCfM02iLZj-2Z7-0ueCAgA&oe=622E2031",
  },
  {
    id: "7",
    name: `Tam Pham`,
    job: "Leader",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-1/240462524_4179583132156576_608167053533083611_n.jpg?stp=c15.0.200.200a_dst-jpg_p200x200&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_ohc=6BBdB725KOQAX8iRSUZ&_nc_oc=AQk1ZboNt8xuqw7IQy2Mnx7bhFi8dGxNg6u8HgGKqUFo70WxzruZq099wnXQ7ccvrLc&_nc_ht=scontent-nrt1-1.xx&oh=00_AT9YAUa4VsV17wTe-hohZSEWkkYQdm5A2fr4uuI5BC2Frw&oe=622DE1E2",
  },
  {
    id: "8",
    name: `Tuan Nguyen`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/181055354_947828909302986_3348652181800692491_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=YKFIDGheusgAX_Fm1Nd&_nc_ht=scontent-nrt1-1.xx&oh=00_AT8MHQBEOgRpYBrgk7yomyPQnBh97zA6W0__jHD-0B20Bg&oe=62502882",
  },
  {
    id: "9",
    name: `Nghia Truong`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/124767848_3831093856901641_6053648588856702077_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=174925&_nc_ohc=BpkQ-DyuWK4AX8zKMJw&tn=w1TraXsU_sAixnIZ&_nc_ht=scontent-nrt1-1.xx&oh=00_AT8hp_yAffeJkbVWLhPR_0DSRomwHmkGOXDbzOdA4AvRng&oe=624FB336",
  },
  {
    id: "10",
    name: `Cuong Nguyen`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-6/251761061_4276076422503832_1153938304132514898_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=AjnvtZ9pOnsAX_cbmVy&_nc_ht=scontent-nrt1-1.xx&oh=00_AT843BPdHaNlko5u-7YcYxOguNOPc4E_1gik6mKotzVr8A&oe=622CDEAD",
  },
  {
    id: "11",
    name: `Nghia Nguyen`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/176385765_985887445280063_2441907794791296008_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_ohc=m3c3zgFgetQAX-E4KBs&_nc_ht=scontent-nrt1-1.xx&oh=00_AT95d_K77M0EpzBwV0pOX21N9oz7GCc4EaECT76HE31ZGg&oe=624F0CBB",
  },
  {
    id: "12",
    name: `Linh Pham`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t39.30808-1/272892173_1892853710887323_5361725200432174544_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-5&_nc_sid=7206a8&_nc_ohc=ky-oojzbljEAX9Ophf7&tn=w1TraXsU_sAixnIZ&_nc_ht=scontent-nrt1-1.xx&oh=00_AT9qNEYTYRdgQsGpv9NV-1L9xw9rHe5yim-QPOUM37Bf5Q&oe=622DA0AD",
  },
  {
    id: "13",
    name: `Tuan Lai`,
    job: "Researcher",
    avatar:
      "https://scontent-nrt1-1.xx.fbcdn.net/v/t1.6435-9/37742981_261240628020011_4787307497448800256_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=174925&_nc_ohc=dwdBO10M0AIAX_1vU8r&_nc_ht=scontent-nrt1-1.xx&oh=00_AT9Wm4iErPumctbb-hBcZGK9XzfRDJbCF6MK4yoDDJm9MQ&oe=624D7762",
  },
];

const SectionFounder = () => {
  return (
    <>
      <div className="relative nc-SectionFounder">
        <Heading desc="we are just idiots who want to explore the world">
          ⛱ Meet the team
        </Heading>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
          {FOUNDER_DEMO.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                {item.job}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="relative nc-SectionFounder">
        <Heading desc="">Adviser</Heading>
        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
          {AD_DEMO.map((item) => (
            <div key={item.id} className="max-w-sm">
              <NcImage
                containerClassName="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden"
                className="absolute inset-0 object-cover"
                src={item.avatar}
              />
              <h3 className="mt-4 text-lg font-semibold text-neutral-900 md:text-xl dark:text-neutral-200">
                {item.name}
              </h3>
              <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
                {item.job}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionFounder;
