import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import {
  NetworkListSelector as dbSelector,
  NetworkListLoading,
  NetworkListError,
  fetchNetworkList,
} from "../../Redux/Reducers/NetworkListReducer";
import { useState, useEffect } from "react";
import { BsUsbSymbol } from "react-icons/bs";
import { VscCircleFilled } from "react-icons/vsc";
import { FaSort, FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import Filters from "./Filters";
import PopupContainer from "../Popups/PopupContainer";
import PortDisplay from "./PortDisplay";
import { IoReload } from "react-icons/io5";


// CSS variables for light and dark shimmer colors
const skeletonCSS = `
:root {
  --skeleton-bg: #e0e0e0;
  --skeleton-light1: #e9e9e9;
  --skeleton-light2: #d1d1d1;
}
.dark {
  --skeleton-bg: #262c36; /* Your requested background for dark mode */
  --skeleton-light1: #3a4151;
  --skeleton-light2: #505a70;
}

.skeleton-cell {
  position: relative;
  background: var(--skeleton-bg);
  border-radius: 9999px; /* rounded-full */
  min-height: 12px;
  height: 16px;
  max-height: 22px;
  margin-top: 0.875rem; /* mt-3.5 */
  margin-bottom: 0.875rem;
  width: 68%;
  min-width: 40px;
  max-width: 120px;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.skeleton-shimmer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    270deg,
    var(--skeleton-bg) 0%,
    var(--skeleton-light1) 40%,
    var(--skeleton-light2) 50%,
    var(--skeleton-light1) 60%,
    var(--skeleton-bg) 100%
  );
  background-size: 200% 100%;
  animation: shimmerAnim 1.3s linear infinite;
  transition: background 0.3s ease;
}

@keyframes shimmerAnim {
  0%   { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}
`;

function SkeletonRow({ columns, rowKey }) {
  return (
    <div key={rowKey} className="tr">
      {columns.map((col, colIdx) => (
        <div
          key={`${col.accessorKey}-${colIdx}-${rowKey}`}
          className="td"
          style={{
            width: col.size ?? 100,
          }}
        >
          <div className="skeleton-cell bg-gray-300 dark:bg-[#262C36] relative rounded-full min-h-3 h-4 max-h-5 mt-3.5 mb-3.5 w-5/12 min-w-[40px] max-w-[120px] overflow-hidden transition-colors duration-300">
            <div
              className="skeleton-shimmer absolute inset-0 w-full h-full animate-[shimmerAnim_1.3s_linear_infinite]"
            // The gradient background is set via CSS variables, so no style prop needed here
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DashboardTable({ columnFilters, setColumnFilters }) {
  const columns = [
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: (props) => (
        <p
          className={
            (props.getValue() === "on"
              ? "bg-lightStatusBgOn dark:bg-darkStatusBgOn text-lightStatusTextOn"
              : "bg-lightStatusBgOf dark:bg-darkStatusBgOf text-lightStatusTextOf dark:text-darkStatusTextOf") +
            " flex items-center justify-center w-14 2xl:w-16 h-7 2xl:h-8 rounded-full"
          }
        >
          <VscCircleFilled className="mr-1" />
          {props.getValue() === "on" ? " ON" : " OF"}
        </p>
      ),
    },
    {
      accessorKey: "ip_address",
      header: "IP Address",
      size: 100,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "hostname",
      header: "Host Name",
      size: 90,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "location",
      header: "Location",
      size: 154,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "type",
      header: "Type",
      size: 70,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "os",
      header: "OS",
      size: 130,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "owner_name",
      header: "Owner",
      size: 100,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "description",
      header: "Description",
      size: 224,
      enableSorting: false,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: "",
      header: "Port",
      size: 90,
      enableSorting: false,
      cell: (props) => {
        const rowIp = props.row.original.ip_address;
        return (
          <button
            onClick={() => handlePortClick(rowIp)}
            className="h-7 w-15 2xl:w-17 2xl:h-9 bg-lightButton text-xs 2xl:text-sm rounded-full text-white max-h-[34px] font-semibold flex justify-center items-center"
          >
            <BsUsbSymbol className="mr-0.5" />
            Port
          </button>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const data = useSelector(dbSelector);
  const loading = useSelector(NetworkListLoading);
  const error = useSelector(NetworkListError);

  const [globalFilter, setGlobalFilter] = useState("");
  const [ip, setIp] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    dispatch(fetchNetworkList());
  }, [dispatch]);

  const handlePortClick = (selectedIp) => {
    setIp(selectedIp);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setIp("");
    setShowPopup(false);
  };

  const [pagination, setPagination] = useState({ pageSize: 5, pageIndex: 0 });
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, columnFilters, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const skeletonRowCount = pagination.pageSize || 5;

  return (
    <>
      <style>{skeletonCSS}</style>

      {/* Header and search */}
      <div className="flex flex-wrap justify-between gap-2 mb-2 2xl:mt-4">
        <div className="flex h-9 min-w-[12.5rem] max-w-[20rem] 2xl:max-w-[28rem] 2xl:h-11 flex-grow gap-3 items-center  justify-between text-lightInputElementTextColor">
          <input
            type="text"
            placeholder="Ping Live IP Address"
            className="rounded-lg h-full outline-none min-w-[10rem] flex-grow bg-lightInputElementBgColor dark:bg-darkInputElementBgColor px-3"
          />
          <button className="h-10 2xl:h-11 2xl:max-h-11 2xl:w-[6rem] 2xl:text-xl w-[4.5rem] bg-lightButton rounded-lg text-white max-h-[34px]">
            PING
          </button>
        </div>
        <div className="flex gap-2">
          <Filters globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <div className="h-9 w-9 2xl:h-11 2xl:w-11 rounded-[50px] flex justify-center items-center bg-lightInputElementBgColor dark:bg-darkInputElementBgColor text-lightInputElementTextColor" onClick={()=>{setColumnFilters([]);setGlobalFilter("")}} ><IoReload className="text-xl font-bold" /></div>
        </div>
      </div>

      <div className="table-container scrollbar-hide">
        <div className="flex flex-col flex-grow min-w-[66rem]">
          {/* Table header */}
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className="header-row">
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className="th"
                  style={{ width: header.getSize() }}
                >
                  {header.column.columnDef.header}
                  {header.column.getCanSort() && (
                    <FaSort
                      onClick={header.column.getToggleSortingHandler()}
                      className="mx-1"
                    />
                  )}
                  {{
                    desc: <FaSortAlphaDownAlt />,
                    asc: <FaSortAlphaUp />,
                  }[header.column.getIsSorted()]}
                </div>
              ))}
            </div>
          ))}

          {/* Skeleton or Table rows */}
          {loading ? (
            Array.from({ length: skeletonRowCount }).map((_, idx) => (
              <SkeletonRow columns={columns} rowKey={idx} key={idx} />
            ))
          ) : error ? (
            <div className="tr">
              <div className="td text-tomato-500 p-4" colSpan={columns.length}>
                {error}
              </div>
            </div>
          ) : data && data.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <div key={row.id} className="tr">
                {row.getVisibleCells().map((cell) => (
                  <div
                    key={cell.id}
                    className="td"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="tr">
              <div className="td p-4" colSpan={columns.length}>
                No data found
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination footer */}
      <div className="flex w-full mt-3 px-1 justify-end">
        <div className="flex">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-10 w-10 bg-lightButton mr-2 rounded-md text-white max-h-[34px]"
          >
            {"<"}
          </button>
          <p className="text-lg text-lightHeaderText mr-2">
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </p>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-10 w-10 bg-lightButton rounded-md text-white max-h-[34px]"
          >
            {">"}
          </button>
        </div>
      </div>

      {showPopup &&
        <PopupContainer handlePopupClose={handlePopupClose} className={"h-[62%] lg:h-[55%] w-[90%] lg:w-[55%]"}>
          <PortDisplay ip={ip} handlePopupClose={handlePopupClose} />
        </PopupContainer>
      }
    </>
  );
}
