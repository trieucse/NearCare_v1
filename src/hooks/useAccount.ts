import { useEffect, useLayoutEffect, useState } from "react"

interface User {
    // {"name":"Trung Tin Nguyen","description":"This is Tin","user_type":"Individual","base_uri_content":"abcd"}
    name: string
    description: string
    user_type: string
    base_uri_content: string
}

interface Account {
    account_id: string | null
    user: User | null
}

export default function useUser() {
    const [account, setAccount] = useState<Account>();
    const [registered, setRegistered] = useState(false)

    useEffect(() => {
        const fetchUser: () => void = async () => {
            try {
                const user = await window.contract.get_user({ user_id: window.accountId });

                setAccount({ account_id: window.accountId, user: user })
                setRegistered(true)
            }
            catch (e) {
                setRegistered(false)
            }
        }

        if (window.walletConnection && window.walletConnection.isSignedIn()) {
            fetchUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.walletConnection])

    return { account, registered }
}