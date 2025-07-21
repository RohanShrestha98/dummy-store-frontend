import SearchPagination from "@/components/SearchPagination";
import { ReactTable } from "../../components/Table";
import { useEffect, useMemo, useState } from "react";
import { useProductData } from "@/hooks/useQueryData";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteModal from "@/components/DeleteModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "@/ui/Button";
import truncateText from "@/utils/truncateText";
import InputField from "@/ui/InputField";
import { useAuthStore } from "@/store/useAuthStore";
import SelectModal from "@/components/SelectModal";
import { LuSquareUser, LuStore } from "react-icons/lu";
import { MdOutlineCategory } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import { dummyProductData as data } from "../../../database";
import { dummyStoreData as storeData } from "../../../database";
import { dummyVendorData as vendorData } from "../../../database";
import { dummyCategoryData as categoryData } from "../../../database";

export default function Product() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );

  const [selectedStore, setSelectedStore] = useState(
    user?.data?.store?.id ?? searchParams.get("store") ?? ""
  );
  const [selectedVendor, setSelectedVendor] = useState(
    user?.data?.vendor?.id ?? searchParams.get("vendor") ?? ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    user?.data?.category?.id ?? searchParams.get("category") ?? ""
  );

  const debouncedProductSearch = useDebounce(searchText);

  // 🏬 Store search
  const [storeSearch, setStoreSearch] = useState("");
  const debouncedStoreSearch = useDebounce(storeSearch);

  // 🧑‍🌾 Vendor search
  const [vendorSearch, setVendorSearch] = useState("");
  const debouncedVendorSearch = useDebounce(vendorSearch);

  // 📂 Category search
  const [categorySearch, setCategorySearch] = useState("");
  const debouncedCategorySearch = useDebounce(categorySearch);

  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const { isLoading, isError } = useProductData(
    selectedVendor?.id ?? selectedVendor,
    debouncedProductSearch,
    pageSize,
    page,
    selectedStore?.id ?? selectedStore,
    selectedCategory?.id ?? selectedCategory
  );

  const columns = useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "sn",
        header: () => <span>S.N.</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.images?.[0],
        id: "image",
        cell: (info) => (
          <div>
            <img
              src={
                info?.row?.original?.images?.[0] ??
                "http://localhost:3001/uploads/laptop3.jpg"
              }
              alt="product"
              className="h-6 w-8 object-fill rounded"
            />
          </div>
        ),
        header: () => <span>Image</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.name,
        id: "name",
        cell: (info) => <p>{truncateText(info?.row?.original?.name, 50)}</p>,
        header: () => <span>Product Name</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.store?.name,
        id: "store",
        cell: (info) => (
          <p>{truncateText(info?.row?.original?.store?.name, 20)}</p>
        ),
        header: () => <span>Store</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.vendor?.name,
        id: "vendor",
        cell: (info) => (
          <p>{truncateText(info?.row?.original?.vendor?.name, 20)}</p>
        ),
        header: () => <span>Vendor</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.category?.name,
        id: "category",
        cell: (info) => (
          <p>{truncateText(info?.row?.original?.category?.name, 20)}</p>
        ),
        header: () => <span>Category</span>,
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row?.costPrice,
        id: "costPrice",
        cell: (info) => (
          <p className="font-semibold">${info?.row?.original?.costPrice}</p>
        ),
        header: () => <span>Cost Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.sellingPrice,
        id: "sellingPrice",
        cell: (info) => (
          <p className="font-semibold">${info?.row?.original?.sellingPrice}</p>
        ),
        header: () => <span>Selling Price</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row?.quantity,
        id: "quantity",
        header: () => <span>Qty</span>,
        footer: (props) => props.column.id,
      },

      {
        accessorFn: (row) => row,
        id: "action",
        cell: (info) => {
          const data = info?.cell?.row?.original;
          return (
            <div className="flex gap-2 text-base justify-center">
              <FiEdit2
                onClick={() =>
                  navigate(`/edit-product/${data?.id}`, {
                    state: data,
                  })
                }
                className="text-[#4365a7] cursor-pointer"
              />
              <DeleteModal
                asChild
                desc="Are you sure you want to delete this Product?"
                title="Delete Product"
                id={info?.row?.original?.id}
              >
                <FaRegTrashCan className="text-red-600 cursor-pointer" />
              </DeleteModal>
            </div>
          );
        },
        header: () => <span className="flex justify-center">Action</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const selectModal = [
    {
      data: storeData?.data,
      setSelectedField: setSelectedStore,
      selectedField: selectedStore,
      setSearchText: setStoreSearch,
      title: "Store",
      show: user?.data?.role === "Admin",
      icon: <LuStore />,
      className: "",
    },
    {
      data: vendorData?.data,
      setSelectedField: setSelectedVendor,
      selectedField: selectedVendor,
      setSearchText: setVendorSearch,
      title: "Vendor",
      icon: <LuSquareUser />,
      show: user?.data?.role === "Admin",
      className: "",
    },
    {
      data: categoryData?.data,
      setSelectedField: setSelectedCategory,
      selectedField: selectedCategory,
      setSearchText: setCategorySearch,
      title: "Category",
      icon: <MdOutlineCategory />,
      show: true,
      className: "",
    },
  ];
  const normalizeToId = (value) =>
    typeof value === "object" && value !== null ? value.id : value;

  useEffect(() => {
    const searchQuery = {
      searchText,
      page,
      pageSize,
      store: normalizeToId(selectedStore),
      category: normalizeToId(selectedCategory),
      vendor: normalizeToId(selectedVendor),
    };

    setSearchParams(searchQuery);
  }, [
    page,
    pageSize,
    searchText,
    selectedStore,
    selectedCategory,
    selectedVendor,
  ]);

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2  relative">
          {selectModal?.map((item) => {
            if (item?.show)
              return (
                <SelectModal
                  data={item?.data}
                  setSelectedField={item?.setSelectedField}
                  setSearchText={item?.setSearchText}
                  asChild
                  title={item?.title}
                >
                  <p
                    className={`border px-3 pr-6 flex items-center gap-[6px] text-sm justify-center cursor-pointer hover:drop-shadow-lg bg-white h-8 text-center border-gray-300 drop-shadow-sm  text-gray-700 focus-visible:border-gray-700 ${item?.className}`}
                  >
                    <div className="text-sm text-gray-600">{item?.icon}</div>
                    {item?.selectedField?.name ?? `Select ${item?.title}`}
                  </p>
                </SelectModal>
              );
          })}
        </div>

        <div className="flex items-center gap-2">
          <InputField
            placeholder={"Search product ..."}
            className={"w-[220px] text-sm border text-gray-500 border-gray-300"}
            setSearchText={setSearchText}
          />
          <Button
            buttonName={"Add Product"}
            icon={<FaPlus />}
            handleButtonClick={() => navigate("/add-product")}
          />
        </div>
      </div>
      {/* <DashboardTop /> */}
      <div className=" bg-white drop-shadow">
        <ReactTable
          isLoading={isLoading}
          isError={isError}
          columns={columns}
          data={data?.data ?? []}
          currentPage={1}
          totalPage={1}
          emptyMessage="Oops! No Product available right now."
        />
        <SearchPagination
          totalPage={data?.pagenation?.totalPages}
          setPage={setPage}
          disabled
          setSearchText={setSearchText}
          page={page}
          searchText={searchText}
          pageSize={pageSize}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  );
}
