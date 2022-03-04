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
            toast.info(`You are signed in with ${window.accountId}`);

            try {
                // Check if user is registered, login with user
                const user = await window.contract
                    .get_user({ user_id: window.accountId });

                const { base_uri_content } = user;

                try {
                    if (!base_uri_content) {
                        throw new Error("User not registered");
                    }

                    const content = await axios.get<any, any>(`https://ipfs.io/ipfs/${base_uri_content}`);
                    const { avatar, bgImage, displayName, email, desc, jobName } = content.data;
                    console.log(avatar, bgImage, displayName, email, desc, jobName);

                    const userData: NearAuthorType = {
                        id: "",
                        countDonated: 0,
                        campaign: [],
                        organization: false,

                        // Optional fields
                        avatar,
                        bgImage,
                        displayName,
                        email,
                        desc,
                        jobName,
                    }

                    dispatch(loginWithUser(userData));
                } catch (error: any) {
                    // toast.info("Please fill in your information");
                }
            } catch (error) {
                console.log(error)
            }

            setLoaded(true);
        };

        loadContract();
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