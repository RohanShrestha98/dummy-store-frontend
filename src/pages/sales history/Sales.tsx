import SearchPagination from "@/components/SearchPagination";
import { ReactTable } from "../../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import truncateText from "@/utils/truncateText";
import InputField from "@/ui/InputField";
import Button from "@/ui/Button";
import { FiDownload } from "react-icons/fi";
import { useAuthStore } from "@/store/useAuthStore";
import { TbListDetails } from "react-icons/tb";
import SelectModal from "@/components/SelectModal";
import { LuStore } from "react-icons/lu";
import { dummySalesData as data } from "../../../database";
import { dummyStoreData as storeData } from "../../../database";

export default function Sales() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
  const navigate = useNavigate();
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const storeId = searchParams.get("store");
  const storeName = searchParams.get("storeName");

  const [selectedStore, setSelectedStore] = useState(
    storeId && storeName
      ? { id: storeId, name: storeName }
      : user?.data?.store ?? ""
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "id",
        header: () => <span>S.N.</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.createdBy,
        id: "createdBy",
        cell: (info) => {
          return (
            <p className="max-w-40 line-clamp-1 flex py-1">
              {truncateText(info?.row?.original?.createdBy, 20)}
            </p>
          );
        },
        header: () => <span>Staff</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.store,
        id: "store",
        cell: (info) => {
          return (
            <p className="max-w-40 line-clamp-1 flex">
              {info?.row?.original?.store?.name}
            </p>
          );
        },
        header: () => <span>Store</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.createdAt,
        id: "createdAt",
        cell: (info) => {
          return (
            <p>
              {moment(info?.row?.original?.createdAt).format(
                "ddd, MM/DD, YY hh:mm A"
              )}
            </p>
          );
        },
        header: () => <span>Sales date</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.quantity,
        id: "quantity",
        header: () => <span>Quantity</span>,
        cell: (info) => {
          const data = info?.cell?.row?.original;
          return <div className="pl-4">{data?.quantity}</div>;
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.subTotal,
        id: "subTotal",
        cell: (info) => {
          return <p>${info?.row?.original?.subTotal}</p>;
        },
        header: () => <span>Sub total</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.discount,
        id: "discount",
        cell: (info) => {
          return <p>${info?.row?.original?.discount}</p>;
        },
        header: () => <span>Discount</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.salesTax,
        id: "salesTax",
        cell: (info) => {
          return <p>{info?.row?.original?.salesTax}%</p>;
        },
        header: () => <span>Sales tax</span>,
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row?.total,
        id: "total",
        cell: (info) => {
          return <p>${info?.row?.original?.total}</p>;
        },
        header: () => <span>Total</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row,
        id: "action",
        cell: (info) => {
          const data = info?.cell?.row?.original;
          return (
            <div
              onClick={() => navigate(`/sales-details/${data?.id}`)}
              className="pl-4 text-blue-800 cursor-pointer"
            >
              <TbListDetails size={14} />
            </div>
          );
        },
        header: () => <span>Details</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
      store: selectedStore?.id ?? selectedStore,
      storeName: selectedStore?.name ?? "",
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText, selectedStore]);

  return (
    <div>
      <div className="flex justify-between items-center px-4 pt-4">
        <div className="flex items-center gap-2  relative">
          <InputField
            placeholder={"Search sales ..."}
            className={"w-[220px] border text-gray-500 border-gray-300"}
            setSearchText={setSearchText}
          />
          {user?.data?.role === "Admin" && (
            <SelectModal
              data={storeData?.data}
              setSelectedField={setSelectedStore}
              setSearchText={setSearchText}
              asChild
              title={"Store"}
            >
              <div
                className={`border px-3 flex items-center gap-[6px] text-sm  cursor-pointer hover:drop-shadow-lg bg-white h-8 text-center  border-gray-300 drop-shadow-sm  text-gray-500 focus-visible:border-gray-700 `}
              >
                <div className="text-sm text-gray-400">
                  <LuStore />
                </div>
                {selectedStore ? selectedStore?.name : "Select Store"}
              </div>
            </SelectModal>
          )}
        </div>
        <Button
          buttonName={"Download"}
          icon={<FiDownload />}
          handleButtonClick={() => {}}
        />
      </div>
      <div className="px-4 pt-2 flex flex-col drop-shadow">
        <ReactTable
          columns={columns}
          data={data?.data ?? []}
          currentPage={1}
          totalPage={1}
          emptyMessage="Oops! No History available right now."
        />
        <SearchPagination
          totalPage={data?.pagenation?.totalPages}
          setPage={setPage}
          disabled
          page={page}
          setSearchText={setSearchText}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
