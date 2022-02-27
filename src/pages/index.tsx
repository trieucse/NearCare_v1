import type { NextPage } from 'next'
import Head from 'next/head'
import BgGlassmorphism from '../components/BgGlassmorphism'
import SectionLargeSlider from '../containers/Section/SectionLargeSlider'
import { PostDataType } from "../data/types";
import {
  DEMO_POSTS,
} from "../data/posts";
import SectionGridPosts from '../containers/Section/SectionGridPosts';


const POSTS: PostDataType[] = DEMO_POSTS;
const Home: NextPage = () => {
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
          posts={POSTS.filter((_, i) => i < 3)}
        />
      
      </div>
      <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
            <div className="relative container ">
              <SectionGridPosts
                className="py-16 lg:py-28"
                postCardName="card11"
                heading="Our Recent Campaigns"
                subHeading="Explore 1129 other articles"
                posts={DEMO_POSTS.filter((_, i) => i > 5 && i < 18)}
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

