import Header from "../components/Header";
import React, { FC } from "react";
import { useAppSelector } from "../app/hooks";
// import { selectCurrentPageData } from "../app/pages/selectors";

export interface HeaderContainerProps {
  className?: string;
}

const HeaderContainer: FC<HeaderContainerProps> = ({ className = "" }) => {
  //const currentPage = useAppSelector(selectCurrentPageData);

  return <Header/>;
};

export default HeaderContainer;
function selectCurrentPageData(selectCurrentPageData: any) {
  throw new Error("Function not implemented.");
}

