import * as React from "react";
import LayoutPage from "../components/LayoutPage";

export interface IAppProps {}

export default class App extends React.Component<IAppProps> {
  public render() {
    return (
      <div className={`nc-PageSubcription`} data-nc-id="PageSubcription">
        <LayoutPage
          subHeading="We are trying to make the product better!"
          headingEmoji=""
          heading="Comming soon..."
        >
          <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
            <img
              src="https://downtowncs.com/wp-content/uploads/2021/02/coming-soon.png"
              alt=""
            />
          </section>
        </LayoutPage>
      </div>
    );
  }
}
