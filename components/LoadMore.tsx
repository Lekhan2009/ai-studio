"use client";

import { useRouter } from "next/navigation";

type Props = {
    startCursor: string
    endCursor: string
    hasPreviousPage: boolean
    hasNextPage: boolean
}

const LoadMore = ({ startCursor, endCursor, hasPreviousPage, hasNextPage }: Props) => {
    const router = useRouter();

    const handleNavigation = (type: string) => {
        const currentParams = new URLSearchParams(window.location.search);

        if (type === "prev" && hasPreviousPage) {
            currentParams.delete("endcursor");
            currentParams.set("startcursor", startCursor);
        } else if (type === "next" && hasNextPage) {
            currentParams.delete("startcursor");
            currentParams.set("endcursor", endCursor);
        }

        const newSearchParams = currentParams.toString();
        const newPathname = `${window.location.pathname}?${newSearchParams}`;

        router.push(newPathname);
    };

    return (
        <div className="w-full flexCenter gap-5 mt-10">
            {hasPreviousPage && (
                <button className="flexCenter gap-1 px-4 py-3 rounded-lg text-sm font-medium bg-light-white-300 text-gray-100 hover:bg-white" onClick={() => handleNavigation("prev")}>
                    <span>Previous</span>
                </button>
            )}
            {hasNextPage && (
                <button className="flexCenter gap-1 px-4 py-3 rounded-lg text-sm font-medium bg-light-white-300 text-gray-100 hover:bg-white" onClick={() => handleNavigation("next")}>
                    <span>Next</span>
                </button>
            )}
        </div>
    );
};

export default LoadMore;