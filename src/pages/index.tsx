import type { NextPage } from 'next'
import Head from 'next/head'
import BgGlassmorphism from '../components/BgGlassmorphism'
import SectionLargeSlider from '../containers/Section/SectionLargeSlider'
import { PostDataType } from "../data/types";
import {
  DEMO_POSTS,
} from "../data/posts";
import SectionGridPosts from '../containers/Section/SectionGridPosts';
import { useEffect, useState } from 'react';
import { initContract } from '../utils/utils';
import { selectInitState, selectLoginState } from '../app/login/login';
import { useAppSelector } from '../app/hooks';
import { DEMO_AUTHORS } from '../data/authors';
import { DEMO_CATEGORIES } from '../data/taxonomies';


// const POSTS: PostDataType[] = DEMO_POSTS;
const Home: NextPage = () => { 
  const initState = useAppSelector(selectInitState);
  console.log("initState: ", initState);
  let initCampaign : PostDataType[] = [];
  const [campaign, setCampaign] = useState(initCampaign);
  useEffect(()=>{
    if (initState) {
    const list_crowdfund = async () => {
      const list_crowdfunds = await window.contract.list_crowdfunds();
      let  dataNew = list_crowdfunds.map((item: any) : PostDataType => {
        let itemData = {
          index: 1,
          id: item.id,
          featuredImage: "https://preview.colorlib.com/theme/seelife/img/blog/main-blog/m-blog-2.jpg",
          title: item.title,
          desc: item.description,
          date: item.created,
          href: "/",
          commentCount: 11,
          viewdCount: 2504,
          readingTime: 2,
          bookmark: { "count": 3007, "isBookmarked": false },
          like: { "count": item.target, "isLiked": true },
          authorId: item.owner,
          categoriesId: [3, 12],
          postType: "standard"
        
        }
        const categories = itemData.categoriesId.map(
          (id) => DEMO_CATEGORIES.filter((taxonomy) => taxonomy.id === id)[0]
        );
        return {...itemData, 
          author: DEMO_AUTHORS.filter((user) => user.id === 3)[0],
          categories: [categories[0]]} as PostDataType;
    });
    setCampaign(dataNew);
    
    console.log("🚀 ~ file: index.tsx ~ line 50 ~ constlist_crowdfund= ~ dataNew", dataNew)
    
  };
    list_crowdfund();
    };

    }, [initState]);

  return (
    <div className="nc-PageHome relative">
    <Head>
      <title>Home</title>
    </Head>

    {/* ======== ALL SECTIONS ======== */}
    <div className="relative overflow-hidden">
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
     
      {/* ======= START CONTAINER ============= */}
      <div className="container relative">
        {/* === SECTION  === */}
        <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
          posts={campaign.filter((_, i) => i <3)}
        />
      
      </div>
      <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
            <div className="relative container ">
              <SectionGridPosts
                className="py-16 lg:py-28"
                postCardName="card11"
                heading="Our Recent Campaigns"
                subHeading="Explore 1129 other articles"
                posts={campaign}
                gridClass="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              />
        　　</div>
        </div>
      {/* ======= END CONTAINER ============= */}
    </div>
   </div>
  )
}

export default Home
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

