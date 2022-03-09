import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../../components/ButtonPrimary";
import Textarea from "../../components/Textarea";
import { RequestBaseUriContentType, RequestType } from "../../data/types";

export default function SingleRequest() {
  const router = useRouter();
  const id: number = parseInt(router.query.id as string);
  const [request, setRequest] = useState<RequestType>();
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        if (!window.contract) {
          return;
        }

        const request = await window.contract.get_request_by_id({
          request_id: id,
        });

        console.log("request: ", request);

        const {
          data: { meta },
        } = await axios.get<any>(
          `https://ipfs.io/ipfs/${request.base_uri_content}`
        );

        setRequest({
          ...request,
          uri_content: {
            email: meta.email,
            jobName: meta.jobName,
            name: meta.name,
            note: meta.note,
            passport: meta.passport,
          },
        });
      } catch (error: any) {
        toast.error(error?.message || "Error when fetching request data");
      }
      // console.log("request: ", request);
    };

    fetchRequestData();

    // test setMessages
    setMessages([
      {
        id: 1,
        message: "Hello",
        created_by: "0x1",
        created_at: "2020-01-01",
      },
      {
        id: 2,
        message: "Hello",
        created_by: "0x1",
        created_at: "2020-01-01",
      },
    ]);
  }, [window.contract]);

  const handleOnAccept = async () => {
    try {
      if (!window.contract) {
        return;
      }

      const {
        data: { meta },
      } = await axios.get<any>(
        `https://ipfs.io/ipfs/${request.base_uri_content}`
      );

      const {
        data: { tx },
      } = await window.contract.accept_request({
        request_id: id,
      });

      console.log("tx: ", tx);

      toast.success("Request accepted");
    } catch (error: any) {
      toast.error(error?.message || "Error when accepting request");
    }
  };

  const handleOnDecline = async () => {
    try {
      if (!window.contract) {
        return;
      }

      const {
        data: { meta },
      } = await axios.get<any>(
        `https://ipfs.io/ipfs/${request.base_uri_content}`
      );

      const {
        data: { tx },
      } = await window.contract.decline_request({
        request_id: id,
      });

      console.log("tx: ", tx);

      toast.success("Request accepted");
    } catch (error: any) {
      toast.error(error?.message || "Error when accepting request");
    }
  };
  return (
    <>
      <div className="space-y-4 max-w-5xl p-2 mx-auto my-6 bg-white rounded-md shadow-md py-7 dark:bg-neutral-700 ring-1 dark:ring-0 ring-gray-300 ring-opacity-50">
        {request?.request_type === "CompanyRequest" ||
        request?.request_type === "VolunteerRequest" ? (
          <>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-medium">
                {request.request_type === "CompanyRequest"
                  ? "Company request"
                  : "Volunteer request"}{" "}
                from {request.created_by}
              </h2>
              <p>Request id: {id}</p>

              <div className="flex flex-col items-center">
                Passport:
                <img src={request.uri_content?.passport} />
              </div>

              <div>
                {request.uri_content?.name && (
                  <div>
                    Name: {` `} {request.uri_content.name}
                  </div>
                )}

                <div>
                  Request status: {` `}
                  {!request.is_accepted ? (
                    <span className="text-neutral-500 dark:font-bold dark:text-slate-100">
                      Pending
                    </span>
                  ) : (
                    <span className="text-green-500">Approved</span>
                  )}
                </div>

                {request.uri_content?.note && (
                  <div>
                    Note: {` `} {request.uri_content.note}
                  </div>
                )}

                {request.uri_content?.email && (
                  <div>
                    Email: {` `} {request.uri_content.email}
                  </div>
                )}
                {request.uri_content?.jobName && (
                  <div>
                    Job name: {` `} {request.uri_content.jobName}
                  </div>
                )}
              </div>

              <div className="space-x-2">
                <ButtonPrimary
                  className="bg-green-400 hover:bg-green-500"
                  onClick={handleOnAccept}
                >
                  Accept
                </ButtonPrimary>
                <ButtonPrimary
                  className="bg-red-400 hover:bg-red-500"
                  onClick={handleOnDecline}
                >
                  Decline
                </ButtonPrimary>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}

        <MessageSection messages={messages} />
      </div>
    </>
  );
}

function MessageSection({ messages }: { messages: Array<any> }) {
  return (
    <div className="space-y-1">
      <div className="p-2 bg-green-500 rounded shadow-md text-white">
        Message
      </div>

      <Textarea />

      <div className="flex justify-end">
        <ButtonPrimary className="bg-green-400 hover:bg-green-500">
          Send
        </ButtonPrimary>
      </div>

      {/* Messages */}
      {messages.map((message: any) => (
        <>
          <div className="flex items-center space-x-2 bg-white dark:bg-neutral-800 rounded p-2">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="http://placekitten.com/200/300"
                alt="Avatar of User"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="text-sm leading-5 font-medium text-gray-900 dark:text-slate-100">
                    {message.created_by}
                  </div>
                  <div className="text-sm leading-5 text-gray-500">
                    {message.created_at}
                  </div>

                  <div className="mt-2">{message.message}</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
