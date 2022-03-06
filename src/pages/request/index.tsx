import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectLoginState } from "../../app/login/login";
import NcImage from "../../components/NcImage";
import Pagination from "../../components/Pagination";
import { CustomLink, RequestBaseUriContentType, RequestType } from "../../data/types";
import ReactPaginate from 'react-paginate';
import FacebookLoading from "../../components/FacebookLoading";
import twFocusClass from "../../utils/twFocusClass";

const DashboardPosts = () => {
    const router = useRouter();
    // get from router query, min page is 1
    const page: number = Math.max(parseInt(router.query.page as string, 10), 1);
    const [limit, setLimit] = useState<number>(2);
    const loginState = useAppSelector(selectLoginState);
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [pageCount, setPageCount] = useState<number>(page);

    // items is all pages from 1 to total pages
    const [paginationItems, setPaginationItems] = useState<number[]>([]);

    useEffect(() => {
        setPageCount(page);
    }, []);

    useEffect(() => {
        const fetchRequest = async () => {
            setRequests([]);

            const arr: RequestType[] = await window.contract.get_request_paging({
                from_index:
                    (pageCount - 1) * limit,
                limit: limit
            });

            // Get and set total pages
            const totalPages = Math.ceil(
                await window.contract.get_total_request_count() / limit
            );
            setPaginationItems(Array.from(Array(totalPages).keys()));

            // Async get all base uri content type of all requests
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
        fetchRequest();

    }, [loginState, pageCount]);

    const handlePageClick = (event: any) => {
        setPageCount(event.selected + 1);
    };

    return (
        <div className="flex flex-col max-w-5xl mx-auto space-y-2">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full px-1 py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow dark:border dark:border-neutral-800 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                            {requests?.length == 0 && (<>
                                <div className="flex justify-center">

                                    <FacebookLoading />
                                </div>
                            </>)}
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
            <div className="flex justify-center pb-8">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={paginationItems.length}
                    previousLabel="< previous"
                    className="flex space-x-2"
                    pageLinkClassName="inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
                    activeLinkClassName={`bg-primary-400 text-slate-900 dark:bg-primary-6000 dark:text-white ${twFocusClass()}`}
                    nextClassName="px-2 inline-flex h-11 items-center justify-center rounded-md bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
                    previousClassName="px-2 inline-flex h-11 items-center justify-center rounded-md bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700"
                    disabledLinkClassName="text-neutral-500 dark:text-neutral-300"
                />

                {/* <Pagination
                /> */}
            </div>

        </div>
    );
};

export default DashboardPosts;
