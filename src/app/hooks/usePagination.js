import { useState, useMemo } from "react";

export const usePagination = (data, itemsPerPage = 12) => {
    const [page, setPage] = useState(1);

    const totalPages = useMemo(() => {
        if (!data) return 0;
        return Math.ceil(data.length / itemsPerPage);
    }, [data, itemsPerPage]);

    const paginatedData = useMemo(() => {
        if (!data) return [];
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, page, itemsPerPage]);

    const goToPage = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return {
        page,
        totalPages,
        paginatedData,
        goToPage,
        setPage,
    };
};