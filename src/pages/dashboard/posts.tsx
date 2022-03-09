import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/login/login";
import NcImage from "../../components/NcImage";
import Pagination from "../../components/Pagination";
import { RequestBaseUriContentType, RequestType } from "../../data/types";

const DashboardPosts = () => {
  const loginState = useAppSelector(selectLoginState);
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (loginState) {
        const arr: RequestType[] = await window.contract.get_request_paging({
          from_index: 0,
          limit: 10,
        });

        const results = await Promise.all(
          arr.map((request) => {
            return new Promise<RequestType>(async (resolve, reject) => {
              try {
                const { data } = await axios.get<RequestBaseUriContentType>(
                  `https://ipfs.io/ipfs/${request.base_uri_content}`
                );

                resolve({
                  uri_content: {
                    ...data,
                  },
                  ...request,
                });
              } catch (e) {
                reject(e);
              }
            });
          })
        );

        setRequests(results);
      }
    };
    fetchRequest();
  }, [loginState]);

  const handleOnAccept = async (id: number) => {
    try {
      if (!window.contract) {
        return;
      }

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

  const handleOnDecline = async (id: number) => {
    try {
      if (!window.contract) {
        return;
      }

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
    <div className="flex flex-col space-y-8">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full px-1 py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden shadow dark:border dark:border-neutral-800 sm:rounded-lg">
            <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
              <thead className="bg-neutral-50 dark:bg-neutral-800">
                <tr className="text-xs font-medium tracking-wider text-left uppercase text-neutral-500 dark:text-neutral-300">
                  <th scope="col" className="px-6 py-3">
                    Request maker
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>

                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:bg-neutral-900 divide-neutral-200 dark:divide-neutral-800">
                {requests.map((item) => (
                  <tr key={item.request_id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center max-w-md overflow-hidden w-96 lg:w-auto">
                        {/* <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={""}
                        /> */}
                        <div className="flex-grow ml-4">
                          <Link href={`/request/${item.request_id}`}>
                            <a>
                              <h2 className="inline-flex text-sm font-semibold line-clamp-2 dark:text-neutral-300">
                                {item.created_by}
                              </h2>
                            </a>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {!item.is_closed ? (
                        <span className="inline-flex px-2 text-xs font-medium leading-5 text-teal-900 bg-teal-100 rounded-full lg:text-sm">
                          Pending check
                        </span>
                      ) : (
                        <span className="inline-flex px-2 text-sm rounded-full text-neutral-500 dark:text-neutral-400">
                          Closed
                          {item.is_accepted ? (
                            <span className="ml-1 text-xs font-medium leading-5 text-teal-900 bg-teal-100 rounded-full lg:text-sm">
                              Accepted
                            </span>
                          ) : (
                            <span className="ml-1 text-xs font-medium leading-5 text-teal-900 bg-teal-100 rounded-full lg:text-sm">
                              Declined
                            </span>
                          )}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                      <span> {item.request_type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap text-neutral-300">
                      <button
                        onClick={() => {
                          handleOnAccept(item.request_id);
                        }}
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Approve
                      </button>
                      {` | `}
                      <button
                        onClick={() => {
                          handleOnDecline(item.request_id);
                        }}
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardPosts;
