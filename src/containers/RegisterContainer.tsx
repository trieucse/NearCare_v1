import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginWallet, loginWithUser, logoutMod, selectInitState, selectLoginState, selectUserState } from "../app/login/login";
import ButtonPrimary from "../components/ButtonPrimary";
import FacebookLoading from "../components/FacebookLoading";
import { NearAuthorType } from "../data/types";
import { initContract } from "../utils/utils";

type IRegisterContainer = {
    children: JSX.Element
}

export default function RegisterContainer({ children }: IRegisterContainer) {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadContract = async () => {
            await initContract();

            console.log("Contract loaded");
            if (!window.walletConnection.isSignedIn()) {
                dispatch(logoutMod());
                return;
            }

            dispatch(loginWallet());
            // toast.info(`You are signed in with ${window.accountId}`);

            let userData: NearAuthorType | null = null;
            let user = null;

            try {
                // Check if user is registered, login with user
                user = await window.contract
                    .get_user({ user_id: window.accountId });

                const { base_uri_content } = user;

                console.log("Base uri content: ", base_uri_content)
                if (!base_uri_content) {
                    throw new Error("User not registered");
                }

                const content = await axios.get<{ meta: NearAuthorType }>(`https://ipfs.io/ipfs/${base_uri_content}`);
                const { avatar, bgImage, displayName, email, desc, jobName, href } = content.data.meta;


                userData = {
                    id: window.accountId,

                    // TODO: Update count donated
                    countDonated: 0,

                    //TODO: Load campaign
                    campaign: [],
                    type: user.user_type,

                    // Optional fields
                    avatar,
                    bgImage,
                    displayName,
                    email,
                    desc,
                    jobName,
                    href
                }

            } catch (error) {
                console.log(error)
            } finally {

                dispatch(loginWithUser(
                    userData || {
                        id: window.accountId,
                        countDonated: 0,
                        campaign: [],
                        type: user?.user_type || "Unknown",
                        displayName: window.accountId,
                        avatar: "",
                        desc: user?.desc || "",
                    }
                ));
            }

        };

        loadContract().finally(() => setLoaded(true));
    }, []);

    if (!loaded) {
        return (
            <div className="flex justify-center">

                <FacebookLoading />
            </div>
        )
    }

    return <>
        {children}
    </>
}