import { MegamenuItem, NavItemType } from "../components/NavigationItem";
import ncNanoId from "../utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

const megaMenuDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGNvbXBhbnl8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Company",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Company,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGFwcHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "App Name",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.AppName,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2l0eXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "City",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.City,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1575328630189-440449ed8cd1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGNvbnRydWN0aW9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Contruction",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Contruction,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y291bnRyeXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Country",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Country,
    })),
  },
];

const megaMenu3ItemDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "http://images.unsplash.com/photo-1525130413817-d45c1d127c42?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29ycG9yYXRlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Corporate",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Corporate,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Car Model",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.CarModel,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmV0YWlsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=60",
    title: "Department",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Department,
    })),
  },
];

const dashboardChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/dashboard",
    name: "Dashboard",
  },
  {
    id: ncNanoId(),
    href: "/dashboard/campaigns",
    name: "My campaigns",
  },
  // {
  //   id: ncNanoId(),
  //   href: "/profile/edit",
  //   name: "Edit profile",
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/request",
  //   name: "Requests",
  // },
];

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/about",
    name: "About",
  },
  {
    id: ncNanoId(),
    href: "/contact",
    name: "Contact us",
  },
  {
    id: ncNanoId(),
    href: "/login",
    name: "Login",
  },
  {
    id: ncNanoId(),
    href: "/signup",
    name: "Signup",
  },
  {
    id: ncNanoId(),
    href: "/forgot-pass",
    name: "Forgot Password",
  },
  {
    id: ncNanoId(),
    href: "/dashboard",
    name: "Dashboard",
    type: "dropdown",
    children: dashboardChildMenus,
  },
  {
    id: ncNanoId(),
    href: "/subscription",
    name: "Subscription",
  },
];

const archviePageChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/archive/the-demo-archive-slug",
    name: "Archive Page",
  },
  {
    id: ncNanoId(),
    href: "/archive-audio/the-demo-archive-slug",
    name: "Archive Audio",
  },
  {
    id: ncNanoId(),
    href: "/archive-video/the-demo-archive-slug",
    name: "Archive Video",
  },
  {
    id: ncNanoId(),
    href: "/author/the-demo-author-slug",
    name: "Author Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/author/the-demo-author-slug",
        name: "Author Page 1",
      },
      {
        id: ncNanoId(),
        href: "/author-v2/the-demo-author-slug",
        name: "Author Page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/search",
    name: "Search Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/search",
        name: "Seach Page 1",
      },
      {
        id: ncNanoId(),
        href: "/search-v2",
        name: "Search Page 2",
      },
    ],
  },
];

const singleChildrenMenus: NavItemType = {
  id: ncNanoId(),
  href: "/single/this-is-single-slug",
  name: "Single Template ",
  type: "dropdown",
  children: [
    {
      id: ncNanoId(),
      href: "/single-sidebar/this-is-single-slug",
      name: "Single Template 1",
    },
    {
      id: ncNanoId(),
      name: "Template 1 sidebar",
      href: "/single/this-is-single-slug-2",
    },
    {
      id: ncNanoId(),
      href: "/single-template-2/this-is-single-slug-2",
      name: "Single Template 2",
    },
    {
      id: ncNanoId(),
      href: "/single-2-sidebar/this-is-single-slug",
      name: "Template 2 sidebar",
    },
    {
      id: ncNanoId(),
      href: "/single-template-3/this-is-single-slug-3",
      name: "Single Template 3",
    },
    {
      id: ncNanoId(),
      href: "/single-3-sidebar/this-is-single-slug",
      name: "Template 3 sidebar",
    },
  ],
};

const demoChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Default Demo",
  },
];

const templateChilds: NavItemType[] = [
  ...archviePageChildrenMenus,
  singleChildrenMenus,
  {
    id: ncNanoId(),
    href: "/single-gallery/this-is-single-slug",
    name: "Single Gallery",
  },
  {
    id: ncNanoId(),
    href: "/single-audio/this-is-single-slug",
    name: "Single Audio",
  },
  {
    id: ncNanoId(),
    href: "/single-video/this-is-single-slug",
    name: "Single Video",
  },
];

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home",
    // type: "",
    children: [],
  },
  {
    id: ncNanoId(),
    href: "/cases",
    name: "Cases",
    // type: "",
    children: [],
  },
  {
    id: ncNanoId(),
    href: "/charity_auction",
    name: "Charity Auction",
    // type: "",
    children: [],
  },
  {
    id: ncNanoId(),
    href: "/about",
    name: "About",
    // type: "",
    children: [],
  },
  {
    id: ncNanoId(),
    href: "/new_campaign",
    name: "New Campaign",
    // type: "",
    children: [],
  },

  // {
  //   id: ncNanoId(),
  //   href: "#",
  //   name: "Five cols",
  //   type: "megaMenu",
  //   megaMenu: megaMenuDemo,
  // },

  // {
  //   id: ncNanoId(),
  //   href: "#",
  //   name: "Fewer cols",
  //   type: "megaMenu",
  //   megaMenu: megaMenu3ItemDemo,
  // },
  // {
  //   id: ncNanoId(),
  //   href: "#",
  //   name: "Templates",
  //   type: "dropdown",
  //   children: templateChilds,
  // },
  // {
  //   id: ncNanoId(),
  //   href: "/dashboard",
  //   name: "Dashboard",
  //   type: "dropdown",
  //   children: dashboardChildMenus,
  // },
];
