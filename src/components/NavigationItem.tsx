import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { WithRouterProps } from "next/dist/client/with-router";
import Link from "next/link";
import { withRouter } from "next/router";
// import { withRouter } from "next/router";
import React, { FC, Fragment, useEffect, useState } from "react";
import { NavLink } from "./NavLink";
// import { NavLink, RouteComponentProps, withRouter } from "react-router-dom";
import NcImage from "./NcImage";

// <--- NavItemType --->
export interface MegamenuItem {
  id: string;
  image: string;
  title: string;
  items: NavItemType[];
}
export interface NavItemType {
  id: string;
  name: string;
  href: string;
  targetBlank?: boolean;
  children?: NavItemType[];
  megaMenu?: MegamenuItem[];
  type?: "dropdown" | "megaMenu" | "none";
}

export interface NavigationItemProps {
  menuItem: NavItemType;
  router: WithRouterProps["router"];
}

type NavigationItemWithRouterProps = NavigationItemProps;

const NavigationItem: FC<NavigationItemWithRouterProps> = ({
  menuItem,
  // history,
}) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([]);

  // CLOSE ALL MENU OPENING WHEN CHANGE HISTORY
  useEffect(() => {
    // const unlisten = history.listen(() => {
    //   setMenuCurrentHovers([]);
    // });
    // return () => {
    //   unlisten();
    // };
  }, []);

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id]);
  };

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id);
      });
    });
  };

  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menu.id);

    const isFull = menu.megaMenu && menu.megaMenu?.length > 3;
    const classPopover = isFull
      ? "menu-megamenu--large"
      : "menu-megamenu--small relative";
    const classPanel = isFull ? "left-0" : "-translate-x-1/2 left-1/2";

    return (
      <Popover
        as="li"
        className={`menu-item menu-megamenu ${classPopover}`}
        onMouseEnter={() => onMouseEnterMenu(menu.id)}
        onMouseLeave={() => onMouseLeaveMenu(menu.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menu)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className={`nc-will-change-transform sub-menu absolute transform z-10 w-screen max-w-sm px-4 pt-3 sm:px-0 lg:max-w-max ${classPanel}`}
              >
                <div className="overflow-hidden text-sm rounded-lg shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10">
                  <div
                    className={`relative bg-white dark:bg-neutral-900 px-3 py-6 grid gap-1 grid-cols-${menu.megaMenu?.length}`}
                  >
                    {menu.megaMenu?.map((item) => (
                      <div key={item.id}>
                        <div className="px-2">
                          <NcImage
                            containerClassName="w-36 h-24 rounded-lg overflow-hidden relative flex"
                            src={item.image}
                          />
                        </div>
                        <p className="px-2 py-1 my-2 font-medium text-neutral-900 dark:text-neutral-200">
                          {item.title}
                        </p>
                        <ul className="grid space-y-1">
                          {item.items.map(renderMegaMenuNavlink)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  const renderMegaMenuNavlink = (item: NavItemType) => {
    return (
      <li key={item.id}>
        <NavLink
          // exact
          // strict
          // target={item.targetBlank ? "_blank" : undefined}
          // rel="noopener noreferrer"
          // className="inline-flex items-center px-2 py-1 font-normal rounded text-neutral-6000 dark:text-neutral-300 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
          href={{
            pathname: item.href || undefined,
          }}
          activeClassName="font-semibold text-neutral-900 dark:!text-neutral-200"
        >
          <div className="inline-flex items-center px-2 py-1 font-normal rounded text-neutral-6000 dark:text-neutral-300 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
            {item.name}
          </div>
        </NavLink>
      </li>
    );
  };

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id);
    return (
      <Popover
        as="li"
        className="relative menu-item menu-dropdown"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute left-0 z-10 w-56 pt-3 transform sub-menu nc-will-change-transform"
              >
                <ul className="relative grid py-4 space-y-1 text-sm bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 dark:bg-neutral-900">
                  {menuDropdown.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id);
    return (
      <Popover
        as="li"
        key={item.id}
        className="relative px-2 menu-item menu-dropdown"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute top-0 z-10 w-56 pl-2 sub-menu left-full"
              >
                <ul className="relative grid py-4 space-y-1 text-sm bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 dark:bg-neutral-900">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i);
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      );
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <NavLink
        // exact
        // strict
        // target={item.targetBlank ? "_blank" : undefined}
        // rel="noopener noreferrer"
        // className="flex items-center px-4 py-2 font-normal rounded-md text-neutral-6000 dark:text-neutral-300 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: item.href || undefined,
        }}
        activeClassName="font-semibold text-neutral-700 dark:!text-neutral-200"
      >
        <div className="flex items-center px-4 py-2 font-normal rounded-md text-neutral-6000 dark:text-neutral-300 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
          {item.name}
          {item.type && (
            <ChevronDownIcon
              className="w-4 h-4 ml-2 text-neutral-500"
              aria-hidden="true"
            />
          )}
        </div>
      </NavLink>
    );
  };

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType) => {
    return (
      <Link
        href={item.href}
        passHref
      >
        <a
          className="inline-flex items-center px-4 py-2 text-sm font-normal rounded-full xl:text-base text-neutral-700 dark:text-neutral-300 xl:px-5 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          {item.name}
          {item.type && (
            <ChevronDownIcon
              className="w-4 h-4 ml-1 -mr-1 text-neutral-400"
              aria-hidden="true"
            />
          )}
        </a>
      </Link>

      // <NavLink
      //   // exact
      //   // strict
      //   // target={item.targetBlank ? "_blank" : undefined}
      //   // rel="noopener noreferrer"
      //   //className="inline-flex items-center px-4 py-2 text-sm font-normal rounded-full xl:text-base text-neutral-700 dark:text-neutral-300 xl:px-5 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
      //   href={{
      //     pathname: item.href || undefined,
      //   }}
      //   activeClassName="!font-semibold !text-neutral-900 bg-neutral-100 dark:bg-neutral-800 dark:!text-neutral-100"
      // >
      //   <div className="inline-flex items-center px-4 py-2 text-sm font-normal rounded-full xl:text-base text-neutral-700 dark:text-neutral-300 xl:px-5 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200">
      //     {item.name}
      //     {item.type && (
      //       <ChevronDownIcon
      //         className="w-4 h-4 ml-1 -mr-1 text-neutral-400"
      //         aria-hidden="true"
      //       />
      //     )}
      //   </div>
      // </NavLink>
    );
  };

  switch (menuItem.type) {
    case "megaMenu":
      return renderMegaMenu(menuItem);
    case "dropdown":
      return renderDropdownMenu(menuItem);
    default:
      return <li className="menu-item">{renderMainItem(menuItem)}</li>;
  }
};
// Your component own properties

const NavigationItemWithRouter = withRouter<
  NavigationItemWithRouterProps,
  FC<NavigationItemWithRouterProps>
>(NavigationItem);
export default NavigationItemWithRouter;
