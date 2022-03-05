import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/login/login";
import NcImage from "../../components/NcImage";
import Pagination from "../../components/Pagination";
import { RequestBaseUriContentType, RequestType } from "../../data/types";


const people = [
  {
    id: 1,
    title: "Tokyo Fashion Week Is Making Itself Great Again",
    image:
      "https://images.unsplash.com/photo-1617059063772-34532796cdb5?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 2,
    title: "Traveling Tends to Magnify All Human Emotions",
    image:
      "https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 3,
    title: "Interior Design: Hexagon is the New Circle in 2018",
    image:
      "https://images.unsplash.com/photo-1617201277988-f0efcc14e626?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 4,
    title: "Heritage Museums & Gardens to Open with New Landscape",
    image:
      "https://images.unsplash.com/photo-1622960748096-1983e5f17824?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
  {
    id: 5,
    title:
      "Man agrees to complete $5,000 Hereford Inlet Lighthouse painting job",
    image:
      "https://images.unsplash.com/photo-1617202227468-7597afc7046d?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: false,
    payment: "Not Applicable",
  },
  {
    id: 6,
    title:
      "Denton Corker Marshall the mysterious black box is biennale pavilion",
    image:
      "https://images.unsplash.com/photo-1622978147823-33d5e241e976?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60",
    liveStatus: true,
    payment: "Not Applicable",
  },
];


const DashboardPosts = () => {
  const loginState = useAppSelector(selectLoginState);
  const [requests, setRequests] = useState<RequestType[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      if (loginState) {
        const arr: RequestType[] = await window.contract.get_request_paging({ from_index: 0, limit: 10 });

        const results = await Promise.all(arr.map(request => {
          return new Promise<RequestType>(async (resolve, reject) => {
            try {
              const { data } = await axios.get<RequestBaseUriContentType>(`https://ipfs.io/ipfs/${request.base_uri_content}`);

              resolve({
                uri_content: {
                  ...data,
                },
                ...request,

              });
            }
            catch (e) {
              reject(e);
            }
          })
        }));


        setRequests(results);
      }
    }
    fetchRequest();

  }, [loginState]);

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
                            </span>)
                            : (
                              <span className="ml-1 text-xs font-medium leading-5 text-teal-900 bg-teal-100 rounded-full lg:text-sm">
                                Declined
                              </span>)
                          }
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-neutral-500 dark:text-neutral-400">
                      <span> {item.request_type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap text-neutral-300">
                      <a
                        href="/#"
                        className="text-primary-800 dark:text-primary-500 hover:text-primary-900"
                      >
                        Approve
                      </a>
                      {` | `}
                      <a
                        href="/#"
                        className="text-rose-600 hover:text-rose-900"
                      >
                        Decline
                      </a>
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
