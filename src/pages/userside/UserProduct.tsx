import Loading from "@/assets/AllSvg";
import Button from "@/ui/Button";
import truncateText from "@/utils/truncateText";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useCheckoutProductStore } from "@/store/useCheckoutProductStore";
import { MdOutlineCategory, MdOutlineQrCodeScanner } from "react-icons/md";
import BarcodeScanner from "@/components/BarcodeScanner";
import { useSalesMutation } from "@/hooks/useMutateData";
import toast from "react-hot-toast";
import CheckoutModal from "./CheckoutModal";
import { useAuthStore } from "@/store/useAuthStore";
import EmptyPage from "@/components/EmptyPage";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import InputField from "@/ui/InputField";
import SelectModal from "@/components/SelectModal";
import { LuStore } from "react-icons/lu";
import useDebounce from "@/hooks/useDebounce";
import { dummyProductData as data } from "../../../database";
import { dummyStoreData as storeData } from "../../../database";
import { dummyCategoryData as categoryData } from "../../../database";

export default function UserProduct() {
  const { user } = useAuthStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState(
    searchParams.get("searchText") ?? ""
  );
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
  const [page, setPage] = useState(searchParams.get("page") ?? "1");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") ?? ""
  );
  const storeId = searchParams.get("store");
  const storeName = searchParams.get("storeName");

  const [selectedStore, setSelectedStore] = useState(
    storeId && storeName
      ? { id: storeId, name: storeName }
      : user?.data?.store ?? ""
  );

  const [storeSearch, setStoreSearch] = useState("");
  const debouncedStoreSearch = useDebounce(storeSearch);

  const [categorySearch, setCategorySearch] = useState("");
  const debouncedCategorySearch = useDebounce(categorySearch);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCheckOutModal, setOpenCheckOutModal] = useState(false);
  const [scannedBarCode, setScannedBarCode] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const { checkoutProduct, setCheckoutProduct } = useCheckoutProductStore();
  const [debouncedBarCode, setDebouncedBarCode] = useState("");
  const [scannedBarCodeData, setScannedBarCodeData] = useState([]);
  const [discounts, setDiscounts] = useState({});

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBarCode(scannedBarCode);
      setScannedBarCode("");
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [scannedBarCode]);

  const handleProductClick = (item) => {
    const updated = [item, ...selectedProduct];
    setSelectedProduct(updated);
    setCheckoutProduct(updated);
  };

  const handleRemoveProduct = (index) => {
    const updated = selectedProduct.filter((_, i) => i !== index);
    const updatedDiscounts = { ...discounts };
    delete updatedDiscounts[index];
    setSelectedProduct(updated);
    setCheckoutProduct(updated);
    setDiscounts(updatedDiscounts);
  };

  const subTotalPrice = selectedProduct.reduce((sum, item, index) => {
    const discount = discounts[index] || 0;
    return sum + ((parseFloat(item.sellingPrice) || 0) - discount);
  }, 0);

  const taxPrice = (
    (parseFloat(selectedStore?.tax ?? 0) / 100) *
    subTotalPrice
  ).toFixed(2);
  const totalPrice =
    subTotalPrice + (parseFloat(selectedStore?.tax ?? 0) / 100) * subTotalPrice;

  useEffect(() => {
    setSelectedProduct([]);
    setCheckoutProduct([]);
  }, []);

  const salesMutation = useSalesMutation();

  const onSubmitHandler = async () => {
    const discountedProducts = checkoutProduct.map((item, index) => ({
      ...item,
      discount: discounts[index] || 0,
    }));

    const postData = {
      sales: discountedProducts,
      quantity: discountedProducts.length,
      store: selectedStore ? JSON.stringify(selectedStore) : user?.data?.store,
      subTotal: subTotalPrice,
      total: totalPrice,
      salesTax: selectedStore?.tax,
    };
    try {
      await salesMutation.mutateAsync([`post`, "/create", postData]);
      setOpenCheckOutModal(false);
      setError();
      toast.success(`Sales completed`);
      setCheckoutProduct([]);
      setSelectedProduct([]);
      setScannedBarCodeData([]);
      setDiscounts({});
      setLoading(false);
    } catch (err) {
      console.log("err", err);
      setLoading(false);
      setOpenCheckOutModal(false);
      toast.error(err?.response?.data?.total ?? err?.response?.data?.message);
      setError(err?.response?.data?.message);
    }
  };

  const delayedSubmitHandler = () => {
    setOpenCheckOutModal(true);
    setLoading(true);
    setTimeout(() => {
      onSubmitHandler();
    }, 3000);
  };

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
  useEffect(() => {
    const searchQuery = {
      searchText: searchText,
      page: page,
      pageSize: pageSize,
      category: selectedCategory?.id ?? selectedCategory ?? "",
      store: selectedStore?.id ?? "",
      storeName: selectedStore?.name ?? "",
    };
    setSearchParams(searchQuery);
  }, [page, pageSize, searchText, selectedCategory, selectedStore]);

  return (
    <div>
      <div className="flex items-center  gap-2 pt-4 px-4 relative">
        <MdOutlineQrCodeScanner
          onClick={() => setOpen(true)}
          className="absolute cursor-pointer bg-white text-2xl border p-1 w-8 h-8 top-0 right-0"
        />
        <InputField
          placeholder={"Search product ..."}
          className={"w-[220px] border text-gray-500 border-gray-300"}
          setSearchText={setSearchText}
        />
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
      <div className="px-4 pt-2 pb-4 flex gap-2 relative">
        <BarcodeScanner
          asChild
          open={open}
          setOpen={setOpen}
          setScannedBarCode={setScannedBarCode}
        />
        {/* Product List */}
        <div className="w-2/3 flex flex-col justify-between  border h-[76vh] overflow-auto border-b-4 no-scrollbar bg-white p-4">
          <div className="grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-3">
            {data?.data?.map((item) => {
              if (item?.quantity !== 0)
                return (
                  <div
                    key={item.id}
                    onClick={() => handleProductClick(item)}
                    className="p-2 border cursor-pointer hover:drop-shadow-lg bg-white flex flex-col gap-[2px] justify-center border-gray-300 text-sm relative"
                  >
                    <img
                      className="h-28 object-cover"
                      src={
                        item?.images?.[0] ??
                        "http://localhost:3001/uploads/laptop3.jpg"
                      }
                      alt=""
                    />
                    {item?.offer >= 4 && (
                      <p className="absolute top-[10px] right-0 font-semibold px-2 text-xs bg-red-600 text-white">
                        {item?.offer} % OFF
                      </p>
                    )}
                    <p className="font-semibold w-full line-clamp-2 text-gray-600">
                      {truncateText(item?.name, 40)}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-yellow-600 text-base">
                        ${item?.sellingPrice}
                      </p>
                      <p className="text-green-500 text-[13px] line-clamp-1 top-[100px] left-0 px-2 font-semibold">
                        {item?.quantity} in stock
                      </p>
                    </div>
                  </div>
                );
            })}
          </div>
          {data?.data?.length == 0 && (
            <div className="w-full flex justify-center  pt-16 pb-20">
              <EmptyPage message={"Oops! No product in this store"} />
            </div>
          )}
          <div className="w-full mb-[-10px] flex justify-end">
            <Pagination
              setPageSize={setPageSize}
              totalPage={data?.pagenation?.totalPages}
              page={page}
              pageSize={pageSize}
              setPage={setPage}
            />
          </div>
        </div>

        {/* Checkout Panel */}
        <div className="w-1/3 border px-3 py-2 h-[76vh] bg-white ">
          <p className="font-semibold text-gray-600">Selected Product</p>
          <div className="flex flex-col gap-3 bg-white justify-between h-[69vh] no-scrollbar">
            {selectedProduct?.length ? (
              <div className="flex flex-col gap-2 h-full border-b-4 overflow-auto no-scrollbar">
                {selectedProduct?.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-300 hover:drop-shadow-lg bg-white relative grid grid-cols-4 cursor-pointer items-center w-full gap-1 px-3"
                  >
                    <div className="w-[90%]">
                      <img
                        className="h-12 w-full object-cover"
                        src={
                          item?.images?.[0] ??
                          "http://localhost:3001/uploads/laptop3.jpg"
                        }
                        alt=""
                      />
                    </div>

                    <RxCross2
                      onClick={() => handleRemoveProduct(index)}
                      className="absolute top-0 right-0 bg-gray-300 p-[4px] cursor-pointer font-bold text-xl hover:bg-red-600 hover:text-white"
                    />
                    <div className="absolute top-0 left-0 px-2 py-[2px] cursor-pointer font-bold text-xs bg-gray-500 text-white">
                      {index + 1}
                    </div>
                    <div className="col-span-3 py-2">
                      <p className="font-medium w-full line-clamp-1 text-sm text-gray-600">
                        {truncateText(item?.name, 20)}
                      </p>
                      <div className="flex flex-col gap-[2px]">
                        <div className="flex items-center justify-between w-full">
                          <p className="font-semibold text-yellow-600 text-sm">
                            Selling Price: ${item?.sellingPrice}
                          </p>
                          <p className="text-green-600 font-semibold text-sm">
                            Final: $
                            {(
                              (parseFloat(item.sellingPrice) || 0) -
                              (discounts[index] || 0)
                            ).toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="text-xs text-red-500 font-semibold">
                            Discount:
                          </label>
                          <input
                            type="number"
                            className="w-16 border border-red-400 px-1 outline-none text-xs"
                            min="0"
                            max={item?.sellingPrice}
                            value={discounts[index] ?? ""}
                            onChange={(e) => {
                              let inputValue = e.target.value;

                              // Prevent entering values greater than selling price
                              const numericValue = parseFloat(inputValue);

                              if (!isNaN(numericValue)) {
                                const max = parseFloat(item?.sellingPrice);
                                const value = Math.min(numericValue, max); // clamp to max

                                setDiscounts((prev) => ({
                                  ...prev,
                                  [index]: value,
                                }));
                              } else {
                                setDiscounts((prev) => ({
                                  ...prev,
                                  [index]: "",
                                }));
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center font-semibold text-sm text-gray-500">
                <div className="flex flex-col gap-1 items-center">
                  <IoCalendarClearOutline size={20} />
                  No item selected
                </div>
              </div>
            )}
            {selectedProduct?.length ? (
              <div className="flex flex-col gap-1 font-semibold text-sm text-gray-700">
                <div className="flex items-center justify-between">
                  <p>Sub Total</p>
                  <p className="text-yellow-600">${subTotalPrice}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Tax ({selectedStore?.tax}%) </p>
                  <p className="text-green-600">
                    {!selectedStore ? "Select Store" : "$" + taxPrice}
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            <CheckoutModal
              asChild
              loading={loading}
              open={openCheckOutModal}
              setOpen={setOpenCheckOutModal}
            >
              <Button
                buttonName={`CheckOut ($${totalPrice})`}
                className="w-full"
                disabled={totalPrice < "0"}
                handleButtonClick={() => delayedSubmitHandler()}
              />
            </CheckoutModal>
          </div>
        </div>
      </div>
    </div>
  );
}
