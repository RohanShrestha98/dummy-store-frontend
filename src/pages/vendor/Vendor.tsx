import { useEffect, useState } from "react";
import TopButton from "@/components/TopButton";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteModal from "@/components/DeleteModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddVendorModal from "./AddVendorModal";
import { LuStore } from "react-icons/lu";
import { MdOutlineDashboard } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import truncateText from "@/utils/truncateText";
import EmptyPage from "@/components/EmptyPage";
import InputField from "@/ui/InputField";
import { dummyVendorData as data } from "../../../database";

export default function Vendor() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
  const [pageSize, setPageSize] = useState(
    searchParams.get("pageSize") ?? "10"
  );
  const [page, setPage] = useState(searchParams.get("page") ?? 1);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);
  useEffect(() => {
    const delay = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);

    return () => clearTimeout(delay);
  }, [searchText]);

  const storeDetailOptions = [
    {
      id: 1,
      name: "Product",
      icon: <MdOutlineDashboard size={16} />,
      className: "row-span-2 ",
      navigate: "/vendor-product",
    },
    // {
    //   id: 2,
    //   name: "Staff",
    //   icon: <HiOutlineUsers size={16} />,
    //   className: "col-span-2",
    // },
    {
      id: 3,
      name: "Sales",
      icon: <BsGraphUpArrow size={14} />,
      className: "row-span-2",
    },
  ];

  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText]);

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <InputField
          placeholder={"Search vendor ..."}
          className={"w-[220px] border text-gray-500 border-gray-300"}
          setSearchText={setSearchText}
        />
        <AddVendorModal asChild>
          <div>
            <TopButton
              buttonName={"Add Vendor"}
              className={""}
              handleButtonClick={""}
            />
          </div>
        </AddVendorModal>
      </div>
      <div className="p-4 bg-white border h-[76vh] overflow-auto">
        <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
          {data?.data?.map((item) => {
            return (
              <div className="border border-gray-300 bg-[#f0edfa] p-2 mb-2 relative">
                <p className="text-sm flex justify-between items-center font-semibold text-gray-600">
                  <div className="flex gap-1 items-center line-clamp-1">
                    <LuStore /> {truncateText(item?.name, 30)}
                  </div>
                  <div className="flex gap-1 text-base mb-2">
                    <AddVendorModal asChild edit editData={item}>
                      <FiEdit2
                        size={12}
                        className="text-[#4365a7] cursor-pointer"
                      />
                    </AddVendorModal>
                    <DeleteModal
                      asChild
                      desc={"Are you sure you want to delete this Vendor"}
                      title={"Delete Vendor"}
                      id={item?.id}
                    >
                      <FaRegTrashCan
                        size={12}
                        className="text-red-600 cursor-pointer"
                      />
                    </DeleteModal>
                  </div>
                </p>
                <p className="text-xs font-medium text-gray-600 line-clamp-1">
                  {truncateText(item?.address, 40)}
                </p>
                <div className="grid grid-cols-2 gap-1 mt-2 text-xs font-semibold text-gray-600">
                  {storeDetailOptions?.map((option) => {
                    return (
                      <div
                        onClick={() =>
                          navigate(`${option?.navigate}/${item?.id}/`, {
                            state: item?.name,
                          })
                        }
                        className={`cursor-pointer border flex flex-col gap-[2px] py-3  items-center justify-center border-gray-300 bg-white hover:bg-[#e2dbf9] hover:border-gray-400 `}
                      >
                        {option?.icon}
                        {option?.name}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {data?.data?.length == 0 && (
          <div className="w-full flex justify-center  pt-16 pb-20">
            <EmptyPage message={"Oops! No vendor available right now."} />
          </div>
        )}
      </div>
    </div>
  );
}
