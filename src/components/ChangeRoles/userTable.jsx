import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaSort, FaSortAlphaDownAlt, FaSortAlphaUp } from "react-icons/fa";
import { userSelector, userListLoading, userListError, fetchUserDetails,deleteUser } from "../../Redux/Reducers/userReducer";
import Filters from "../Dashboard/Filters";
import PopupContainer from "../Popups/PopupContainer";
import EditUserForm from "./EditUserForm";
import DeleteConfirmation from "../Popups/DeleteConfirmation";

// --- Skeleton shimmer CSS ---
const skeletonCSS = `
:root {
  --skeleton-bg: #e0e0e0;
  --skeleton-light1: #e9e9e9;
  --skeleton-light2: #d1d1d1;
}
.dark {
  --skeleton-bg: #262c36;
  --skeleton-light1: #3a4151;
  --skeleton-light2: #505a70;
}
.skeleton-cell {
  position: relative;
  background: var(--skeleton-bg);
  border-radius: 9999px;
  min-height: 12px;
  height: 16px;
  max-height: 22px;
  margin-top: 0.875rem;
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

// --- Skeleton Row matching the columns ---
function SkeletonRow({ columns, rowKey }) {
    return (
        <div className="nltr" key={rowKey}>
            {columns.map((col, colIdx) => (
                <div
                    key={col.accessorKey + "-skeleton-" + rowKey + "-" + colIdx}
                    className="nltd"
                    style={{
                        width: col.size ?? 100,
                    }}
                >
                    <div className="skeleton-cell">
                        <div className="skeleton-shimmer" />
                    </div>
                </div>
            ))}
        </div>
    );
}


export default function UserTable() {
    const columns = [
        {
            accessorKey: "first_name",
            header: "First Name",
            size: 150,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "last_name",
            header: "Last Name",
            size: 150,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "email",
            header: "Email",
            size: 200,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "mobile_no",
            header: "Phone",
            size: 150,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "department",
            header: "Department",
            size: 200,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "role",
            header: "Role",
            size: 148,
            enableSorting: false,
            cell: (props) => <p>{props.getValue()}</p>
        },
        {
            accessorKey: "",
            header: "Actions",
            size: 140,
            enableSorting: false,
            cell: (props) => {
                const email = props.row.original.email;
                return (
                    <div className="h-full w-full flex justify-center items-center gap-1" >
                        <button className="h-7 w-12 bg-[#A6E7D8] text-xs rounded-sm text-[#008767] dark:bg-[#1C3122] font-semibold flex justify-center items-center border-1 border-[#00B087]" onClick={() => { handleEditClick(email) }}>Edit</button>
                        <button className="h-7 w-14 bg-[#FFC5C5] text-xs rounded-sm text-[#DF0404] dark:text-[#D62A1B] dark:bg-[#311C1C] font-semibold flex justify-center items-center border-1 border-[#DF0404]" onClick={() => { handleDelete(email) }}>Delete</button>
                    </div >
                )
            }
        },
    ]

    const dispatch = useDispatch();
    const data = useSelector(userSelector);
    const loading = useSelector(userListLoading);
    const error = useSelector(userListError);
    const [globalFilter, setGlobalFilter] = useState('')
    const [pagination, setPagination] = useState({
        pageSize: 5,
        pageIndex: 0
    });

    const [email, setEmail] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

    const handlePopupClose = () => {
        setEmail("");
        setShowPopup(false);
    };

    const handleEditClick = (selectedEmail) => {
        setEmail(selectedEmail);
        setShowPopup(true);
    };

    const handleDelete = (selectedEmail) => {
        setEmail(selectedEmail);
        setShowDeleteConfirmation(true);
    }

    const handleDeleteConfirmation = (selectedEmail) => {
        dispatch(deleteUser({ email: selectedEmail }));
        setShowDeleteConfirmation(false);
        setMac("");
    }

    // Number of skeleton rows to display while loading
    const skeletonRowCount = pagination.pageSize || 5;

    return (
        <>
            {/* Inject skeleton CSS */}
            <style>{skeletonCSS}</style>

            {/* Search Bar */}
            <div className="flex px-5 lg:px-8">
                <Filters
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>

            <div className="table-container scrollbar-hide">
                <div className="flex flex-col min-w-[1100px]" >
                    {/* Table Headers */}
                    {table.getHeaderGroups().map(headerGroup => (
                        <div className="nltr" key={headerGroup.id}>
                            {headerGroup.headers.map(header =>
                                <div className="nlth" key={header.id} style={{ width: header.getSize() }}>
                                    {header.column.columnDef.header}
                                    {header.column.getCanSort() && <FaSort onClick={header.column.getToggleSortingHandler()} className="mx-1" />}
                                    {{
                                        desc: <FaSortAlphaDownAlt />,
                                        asc: <FaSortAlphaUp />
                                    }[header.column.getIsSorted()]}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Loading Skeleton / Error / Data Rows */}
                    {loading ? (
                        Array.from({ length: skeletonRowCount }).map((_, idx) =>
                            <SkeletonRow columns={columns} rowKey={idx} key={idx} />
                        )
                    ) : error ? (
                        <div className="nltr">
                            <div className="nltd text-tomato-500 p-4" colSpan={columns.length}>
                                {error}
                            </div>
                        </div>
                    ) : data && data.length > 0 ? (
                        table.getRowModel().rows.map(row =>
                            <div className="nltr" key={row.id}>
                                {row.getVisibleCells().map(cell =>
                                    <div className="nltd" key={cell.id} style={{ width: cell.column.getSize() }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </div>
                                )}
                            </div>
                        )
                    ) : (
                        <div className="nltr">
                            <div className="nltd p-4" colSpan={columns.length}>
                                No data found
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Pagination */}
            <div className="flex w-full mt-4 px-2 justify-end">
                <div className="flex">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="h-10 w-10 bg-lightButton mr-2 rounded-md text-white max-h-[34px]">{`<`}</button>
                    <p className="text-lg text-lightHeaderText mr-2">
                        {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </p>
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="h-10 w-10 bg-lightButton rounded-md text-white max-h-[34px]">{`>`}</button>
                </div>
            </div>

            {showPopup &&
                <PopupContainer handlePopupClose={handlePopupClose} closeOnOutsideClick={false} className={"h-[62%] lg:h-[50%] w-[90%] lg:w-[55%]"}>
                    <EditUserForm email={email} handlePopupClose={handlePopupClose} />
                </PopupContainer>
            }

            {
                showDeleteConfirmation &&
                <PopupContainer >
                    <DeleteConfirmation setShowDeleteConfirmation={setShowDeleteConfirmation} handleDeleteConfirmation={handleDeleteConfirmation} id={email} />
                </PopupContainer>
            }
        </>
    )
}
