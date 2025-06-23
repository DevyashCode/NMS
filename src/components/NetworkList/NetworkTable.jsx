import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { NetworkListSelector as dbSelector } from "../../Redux/Reducers/NetworkListReducer";
import { useState } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";
import { FaSort } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import Filters from "../Dashboard/Filters";

const columns = [
    {
        accessorKey: "macAddress",
        header: "MAC Address",
        size: 153,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "ipAddress",
        header: "IP Address",
        size: 110,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "hostName",
        header: "Host Name",
        size: 95,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "location",
        header: "Location",
        size: 150,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "type",
        header: "Type",
        size: 70,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "os",
        header: "OS",
        size: 120,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "owner",
        header: "Owner",
        size: 100,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "description",
        header: "Description",
        size: 200,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "",
        header: "Actions",
        size: 140,
        enableSorting: false,
        cell: (props) =>
            <>
            <div className="h-full w-full flex justify-center items-center gap-1">
                <button className="h-7 w-12 bg-[#A6E7D8] text-xs rounded-sm text-[#008767] dark:bg-[#1C3122] font-semibold flex justify-center items-center border-1 border-[#00B087]">Edit</button>
                <button className="h-7 w-14 bg-[#FFC5C5] text-xs rounded-sm text-[#DF0404] dark:bg-[#311C1C] font-semibold flex justify-center items-center border-1 border-[#DF0404]">Delete</button>
            </div>
            </>
    },
]


export default function NetworkTable() {
    const data = useSelector(dbSelector);
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageSize: 6,
        pageIndex: 0
    });
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            pagination
        },
        onGlobalFilterChange: setGlobalFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange",
    });

    return (
        <>
            {/* Search Bar */}
            <div className="grid w-full items-center px-8">
                <Filters
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>

            <div className="mt-8 rounded-xl overflow-auto">
                <div className="flex flex-col flex-grow">
                    {
                        table.getHeaderGroups().map(headerGroup => <div className="nltr" key={headerGroup.id}>
                            {
                                headerGroup.headers.map(
                                    header =>
                                        <div className="nlth" key={header.id} style={{ width: header.getSize() }}>
                                            {header.column.columnDef.header}
                                            {header.column.getCanSort() && <FaSort onClick={header.column.getToggleSortingHandler()} className="mx-1" />}
                                            {
                                                {
                                                    desc: <FaSortAlphaDownAlt />,
                                                    asc: <FaSortAlphaUp />
                                                }[header.column.getIsSorted()]
                                            }
                                        </div>
                                )
                            }
                        </div>
                        )}
                    {
                        table.getRowModel().rows.map(row =>
                            <div className="nltr" key={row.id}>
                                {row.getVisibleCells().map(cell => <div className="nltd" key={cell.id} style={{ width: cell.column.getSize() }}>
                                    {
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
                                    }
                                </div>)}
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="flex w-full mt-2 px-2 justify-end">
                <div className="flex">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-10 w-10 bg-lightButton mr-2 rounded-md text-white max-h-[34px]">{"<"}</button>
                    <p className="text-lg text-lightHeaderText mr-2">
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-10 w-10 bg-lightButton rounded-md text-white max-h-[34px]">{">"}</button>
                </div>
            </div>
        </>
    )
}

