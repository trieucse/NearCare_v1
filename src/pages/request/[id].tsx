import axios from "axios";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../components/ButtonPrimary";
import { RequestBaseUriContentType, RequestType } from "../../data/types";

export default function SingleRequest() {
    const router = useRouter();
    const id: number = parseInt(router.query.id as string);
    const [request, setRequest] = useState<RequestType>();

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                if (!window.contract) {
                    return;
                }

                const request = await window.contract.get_request_by_id({ request_id: id });

                const { data } = await axios.get<any>(`https://ipfs.io/ipfs/${request.base_uri_content}`);

                setRequest({
                    ...request,
                    uri_content: {
                        email: data.meta.email,
                        jobName: data.meta.jobName,
                        name: data.meta.name,
                        note: data.meta.note,
                        passport: data.meta.passport,
                    }
                })
            }
            catch (error: any) {
                toast.error(error?.message || "Error when fetching request data");
            }
            console.log("request: ", request);
        }

        fetchRequestData();
    }, [window.contract])

    return (<>
        <div className="max-w-5xl p-2 mx-auto my-6 bg-white rounded-md shadow-md py-7 dark:bg-neutral-700 ring-1 dark:ring-0 ring-gray-300 ring-opacity-50">
            {(request?.request_type === "CompanyRequest" || request?.request_type === "Individual") ?
                (
                    <>
                        <div className="space-y-2 text-center">
                            <h2 className="text-2xl font-medium">
                                {request.request_type === "CompanyRequest" ? "Company request" : "Individual request"} from {request.created_by}
                            </h2>
                            <p>
                                Request id: {id}
                            </p>

                            <div className="flex flex-col items-center">
                                Passport:
                                <img src={request.uri_content?.passport} />
                            </div>

                            <div>
                                {request.uri_content?.name && (
                                    <div>
                                        Name: {` `} {request.uri_content.name}
                                    </div>)}

                                <div>

                                    Request status: {` `}
                                    {!request.is_accepted ?
                                        <span className="text-neutral-500 dark:font-bold dark:text-slate-100">Pending</span>
                                        :
                                        <span className="text-green-500">Approved</span>
                                    }
                                </div>

                                {request.uri_content?.note && (
                                    <div>
                                        Note: {` `} {request.uri_content.note}
                                    </div>
                                )}

                                {request.uri_content?.email && (
                                    <div>
                                        Email: {` `} {request.uri_content.email}
                                    </div>)}
                                {request.uri_content?.jobName && (
                                    <div>
                                        Job name: {` `} {request.uri_content.jobName}
                                    </div>)}



                            </div>


                            <div className="space-x-2">
                                <ButtonPrimary className="bg-green-400 hover:bg-green-500">
                                    Accept
                                </ButtonPrimary>
                                <ButtonPrimary className="bg-red-400 hover:bg-red-500">
                                    Decline
                                </ButtonPrimary>
                            </div>


                        </div>
                    </>
                )
                : (
                    <>
                    </>
                )
            }

        </div>

    </>)
}