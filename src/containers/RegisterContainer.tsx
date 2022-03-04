import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginWallet, loginWithUser, logoutMod, selectLoginState, selectUserState } from "../app/login/login";
import ButtonPrimary from "../components/ButtonPrimary";
import { NearAuthorType } from "../data/types";
import { initContract } from "../utils/utils";

type IRegisterContainer = {
    children: JSX.Element
}

export default function RegisterContainer({ children }: IRegisterContainer) {

    const loginState = useAppSelector(selectLoginState);
    const userState = useAppSelector(selectUserState);

    const dispatch = useAppDispatch();

    useEffect(() => {
        initContract().then(async () => {
            console.log("Contract loaded");
            if (!window.walletConnection.isSignedIn()) {
                console.log("Not signed in");
                dispatch(logoutMod());
            } else {
                console.log("Signed in");

                if (window.walletConnection.isSignedIn()) {
                    dispatch(loginWallet());

                    try {

                        // Check if user is registered, login with user
                        const user = await window.contract
                            .get_user({ user_id: window.accountId });

                        const { base_uri_content } = user;

                        if (base_uri_content) {
                            try {
                                const content = await axios.get<any, any>(`https://ipfs.io/ipfs/${base_uri_content}`);
                                const { avatar, bgImage, displayName, email, desc, jobName } = content.data;
                                console.log(avatar, bgImage, displayName, email, desc, jobName);
                            } catch (error: any) {
                                console.log("Loading base_uri_content failed, uri content is not valid");
                            }
                        }

                        console.log(base_uri_content, user);

                        const userData: NearAuthorType = {
                            // accountId: window.accountId,
                            // baseUriContent: base_uri_content,
                            // name: user.name,
                            // avatarUrl: user.avatar_url,
                        }

                        dispatch(loginWithUser(userData));
                    } catch (error) {
                        console.log("User loggedin with wallet")
                    }
                }
                // console.log("loginState: ", loginState);
            }
        });
    }, []);

    if (loginState && !userState) {
        return (
            <>
                {/* REGISTER ACCOUNT */}

                <div className="">
                    <div className="flex flex-col max-w-6xl gap-1 mx-auto md:flex-row">
                        <div className="flex flex-col flex-1 gap-1">
                            <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-liza-summer-6348123.jpg" />

                            <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Individual", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                            }}>
                                Register as individual account
                            </ButtonPrimary>
                        </div>

                        <div className="flex flex-col flex-1 gap-1">
                            <img className="rounded-md shadow-md object-cover w-full bg-center object-top h-[30rem]" src="/images/pexels-rodnae-productions-6646916.jpg" />

                            <ButtonPrimary className="m-4 rounded-md shadow-lg bg-sky-600 hover:bg-sky-500" onClick={() => {
                                window.contract.register_user({ name: "Trung Tin Nguyen", user_type: "Company", base_uri_content: "abcd", description: "This is Tin" }, 300000000000000, "1000000000000000000000000")
                            }}>
                                Register as company account
                            </ButtonPrimary>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return <>
        {children}
    </>
}