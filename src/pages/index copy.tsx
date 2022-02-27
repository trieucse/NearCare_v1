import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import BackgroundSection from '../components/BackgroundSection'
import BgGlassmorphism from '../components/BgGlassmorphism'
import SectionBecomeAnAuthor from '../components/SectionBecomeAnAuthor'
import SectionGridAuthorBox from '../components/SectionGridAuthorBox'
import SectionSliderNewAuthors from '../components/SectionSliderNewAuthors'
import SectionSliderNewCategories from '../components/SectionSliderNewCategories'
import SectionSubscribe2 from '../components/SectionSubscribe2'
import SectionLargeSlider from '../containers/Section/SectionLargeSlider'
import { PostDataType } from "../data/types";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "../data/posts";
import { DEMO_CATEGORIES } from "../data/taxonomies";
import { DEMO_AUTHORS } from "../data/authors";
import SectionSliderPosts from '../containers/Section/SectionSliderPosts'
import SectionMagazine1 from '../containers/Section/SectionMagazine1'
import SectionMagazine7 from '../containers/Section/SectionMagazine7'
import SectionGridPosts from '../containers/Section/SectionGridPosts'
import SectionMagazine8 from '../containers/Section/SectionMagazine8'
import SectionMagazine9 from '../containers/Section/SectionMagazine9'
import SectionMagazine4 from '../containers/Section/SectionMagazine4'
import SectionVideos from '../containers/Section/SectionVideos'
import SectionLatestPosts from '../containers/Section/SectionLatestPosts'


const POSTS: PostDataType[] = DEMO_POSTS;
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);

const Home: NextPage = () => {
  return (
    <div className="nc-PageHome relative">
    <Head>
      <title>Home</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      
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
     {/* === SECTION  === */}
     {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderNewAuthors
            heading="Newest authors"
            subHeading="Say hello to future creator potentials"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          />
        </div> */}

        {/* === SECTION 5 === */}
        {/* <SectionSliderNewCategories
          className="py-16 lg:py-28"
          heading="Top trending topics"
          subHeading="Discover 233 topics"
          categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          categoryCardType="card4"
        /> */}

        {/* === SECTION 6 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card9"
            heading="Explore latest audio articles"
            subHeading="Click on the icon to enjoy the music or podcast 🎧"
            sliderStype="style2"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i > 3 && i < 10)}
          />
        </div> */}

        {/* === SECTION 4 === */}
        {/* <SectionMagazine1
          className="py-16 lg:py-28"
          posts={MAGAZINE1_POSTS}
          tabs={MAGAZINE1_TABS}
        /> */}


        {/* === SECTION 7 === */}
        {/* <SectionMagazine7
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
        /> */}
      </div>

      {/* === SECTION 11 === */}
      {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
        <div className="relative container">
          <SectionGridPosts
            className="py-16 lg:py-28"
            headingIsCenter
            postCardName="card10V2"
            heading="Explore latest video articles"
            subHeading="Hover on the post card and preview video 🥡"
            posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
            gridClass="md:grid-cols-2 lg:grid-cols-3"
          />
        </div>
      </div> */}

      {/* <div className="container "> */}
        {/* === SECTION 9 === */}
        {/* <SectionMagazine8
          className="py-16 lg:py-28"
          posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
        /> */}

        {/* === SECTION 9 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionMagazine9
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 16)}
          /> */}
        {/* </div> */}

        {/* === SECTION 5 === */}
        {/* <SectionGridAuthorBox
          className="py-16 lg:py-28"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}

        {/* === SECTION 8 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div> */}

        {/* === SECTION 11 === */}
        {/* <SectionMagazine4
          className="py-16 lg:py-28"
          heading="Life styles 🎨 "
          posts={MAGAZINE2_POSTS}
          tabs={MAGAZINE1_TABS}
        /> */}

        {/* === SECTION 12 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionSliderPosts
            postCardName="card11"
            heading=" More design articles"
            subHeading="Over 1118 articles "
            posts={DEMO_POSTS.filter(
              (p, i) => i > 3 && i < 25 && p.postType === "standard"
            )}
            sliderStype="style2"
          />
        </div> */}

        {/* === SECTION 14 === */}
        {/* <SectionSubscribe2 className="pt-16 lg:pt-28" /> */}

        {/* === SECTION 15 === */}
        {/* <SectionVideos className="py-16 lg:py-28" /> */}

        {/* === SECTION 17 === */}
        {/* <SectionLatestPosts
          className="pb-16 lg:pb-28"
          posts={DEMO_POSTS.filter((_, i) => i > 8 && i < 16)}
          widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
          categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
          tags={DEMO_CATEGORIES}
        /> */}

      
      </div>
      {/* ======= END CONTAINER ============= */}
    </div>
  // </div>
  )
}

export default Home
