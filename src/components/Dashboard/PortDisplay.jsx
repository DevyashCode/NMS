import { useSelector } from "react-redux";
import { portSelector } from "../../Redux/Reducers/portReducer";
import { CgCloseO } from "react-icons/cg";
import { useState } from "react";
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { VscCircleFilled } from "react-icons/vsc";

const columns = [
    {
        id: "select",
        header: "Check",
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        size: 80,
    },
    {
        accessorKey: "portNumber",
        header: "Port",
        size: 80,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "service",
        header: "Service",
        size: 154,
        enableSorting: false,
        cell: (props) => <p>{props.getValue()}</p>
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 100,
        cell: (props) => <p className={(props.getValue() == "open" ? "bg-lightStatusBgOn dark:bg-darkStatusBgOn text-lightStatusTextOn" : "bg-lightStatusBgOf dark:bg-darkStatusBgOf text-lightStatusTextOf dark:text-darkStatusTextOf") + " flex items-center justify-center w-15 lg:w-18 h-7 rounded-full gap-1"}><VscCircleFilled />{props.getValue() == "open" ? " Open" : " Close"}</p>
    },
]

export default function PortDisplay({ ip, handlePopupClose }) {
    const portData = useSelector(portSelector);
    const data = portData.find(port => port.ipAddress === ip);
    const [pagination, setPagination] = useState({
        pageSize: 5,
        pageIndex: 0
    });

    const table = useReactTable({
        data: data.portInfo,
        columns,
        state: {
            pagination,
        },
        getCoreRowModel: getCoreRowModel(),
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        enableRowSelection: true,
    });

    return (
        <>
            {/* Heading */}
            <div className="h-12 flex items-center text-lg text-lightHeaderText justify-between w-full">
                <h1>IP : {ip}</h1>
                <CgCloseO className="text-xl" onClick={() => { handlePopupClose() }} />
            </div>

            <div className="mt-4">
                <div className="flex flex-col flex-grow">
                    {
                        table.getHeaderGroups().map(headerGroup => <div className="header-row" key={headerGroup.id}>
                            {
                                headerGroup.headers.map(
                                    header =>
                                        <div className="th" key={header.id} style={{ width: header.getSize() }}>
                                            {header.column.columnDef.header}
                                        </div>
                                )
                            }
                        </div>
                        )}
                    {
                        table.getRowModel().rows.map(row =>
                            <div className="tr" key={row.id}>
                                {row.getVisibleCells().map(cell => <div className="td" key={cell.id} style={{ width: cell.column.getSize() }}>
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

            <div className="flex w-full mt-3 px-2 justify-between items-center">
                <div>
                    <button className="h-8 w-30 bg-lightButton rounded-sm text-white max-h-[34px] flex justify-center items-center">Get Live Ports</button>
                </div>
                <div className="flex">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-6 w-6 bg-lightButton mr-2 rounded-md text-white max-h-[34px] flex justify-center items-center">{"<"}</button>
                    <p className="text-lg text-lightHeaderText mr-2">
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-6 w-6 bg-lightButton rounded-md text-white max-h-[34px] flex justify-center items-center">{">"}</button>
                </div>
            </div>
        </>
    )
}