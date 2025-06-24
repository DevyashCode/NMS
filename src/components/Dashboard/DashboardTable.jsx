import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { NetworkListSelector as dbSelector } from "../../Redux/Reducers/NetworkListReducer";
import { useState } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";
import { FaSort } from "react-icons/fa";
import { FaSortAlphaDownAlt } from "react-icons/fa";
import { FaSortAlphaUp } from "react-icons/fa";
import Filters from "./Filters";
import PortDisplay from "./PortDisplay";

export default function DashboardTable() {
    const columns = [
        {
            accessorKey: "status",
            header: "Status",
            size: 100,
            // enableSorting:false,
            cell: (props) => <p className={(props.getValue() == "on" ? "bg-lightStatusBgOn dark:bg-darkStatusBgOn text-lightStatusTextOn" : "bg-lightStatusBgOf dark:bg-darkStatusBgOf text-lightStatusTextOf dark:text-darkStatusTextOf") + " flex items-center justify-center w-14 h-7 rounded-full"}><VscCircleFilled className="mr-1" />{props.getValue() == "on" ? " ON" : " OF"}</p>
        },
        {
            accessorKey: "ipAddress",
            header: "IP Address",
            size: 100,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "hostName",
            header: "Host Name",
            size: 90,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "location",
            header: "Location",
            size: 154,
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
            size: 130,
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
            size: 224,
            enableSorting: false,

            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "",
            header: "Port",
            size: 90,
            enableSorting: false,
            cell: (props) => {
                const rowIp = props.row.original.ipAddress;

                return (
                    <button
                        onClick={() => {
                            handlePortClick(rowIp);
                        }}
                        className="h-7 w-15 bg-lightButton text-xs rounded-full text-white max-h-[34px] font-semibold flex justify-center items-center"
                    >
                        <BsUsbSymbol className="mr-0.5" />
                        Port
                    </button>
                );
            },
        }
    ]

    const data = useSelector(dbSelector);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilter, setColumnFilter] = useState([]);
    const [ip, setIp] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handlePortClick = (selectedIp) => {
        setIp(selectedIp);
        setShowPopup(true);
    };

    const handlePopupClose=()=>{
        setIp("");
        setShowPopup(false);
    }

    const [pagination, setPagination] = useState({
        pageSize: 5,
        pageIndex: 0
    });
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            columnFilter,
            pagination
        },
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilter,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const handleFilterChange = (type) => {
        if (role === 'All') {
            setColumnFilter([]);
        } else {
            setColumnFilter([{ id: 'type', value: type }]);
        }
    };

    return (
        <>
            {/* IP Ping and Data Search Bar */}
            <div className="flex flex-wrap mt-3 justify-between gap-3">
                <div className="flex h-9 w-100 max-w-180 gap-3 items-center justify-between text-lightInputElementTextColor ">
                    <input type="text" placeholder="Ping Live IP Address" className="rounded-md h-full outline-none flex-grow bg-lightInputElementBgColor dark:bg-darkInputElementBgColor px-3" />
                    <button className="h-10 w-18 bg-lightButton rounded-md text-white max-h-[34px]">PING</button>
                </div>

                {/* kjdsfhkjsh */}
                <Filters
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>

            <div className="mt-8 rounded-xl overflow-auto">
                <div className="flex flex-col flex-grow overflow-auto">
                    {
                        table.getHeaderGroups().map(headerGroup => <div className="header-row" key={headerGroup.id}>
                            {
                                headerGroup.headers.map(
                                    header =>
                                        <div className="th" key={header.id} style={{ width: header.getSize() }}>
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
            <div className="flex w-full mt-2 px-2 justify-end">
                <div className="flex">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-10 w-10 bg-lightButton mr-2 rounded-md text-white max-h-[34px]">{"<"}</button>
                    <p className="text-lg text-lightHeaderText mr-2">
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-10 w-10 bg-lightButton rounded-md text-white max-h-[34px]">{">"}</button>
                </div>
            </div>
            {showPopup && <PortDisplay ip={ip} handlePopupClose={handlePopupClose} />}
        </>
    )
}

