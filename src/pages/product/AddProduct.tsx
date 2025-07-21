import { useProductMutation } from "@/hooks/useMutateData";
import { useProductForUserData } from "@/hooks/useQueryData";
import Button from "@/ui/Button";
import InputField from "@/ui/InputField";
import {
  capitalizeFirstLetter,
  smallLetter,
} from "@/utils/capitalizeFirstLetter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { PiCalendarBlank } from "react-icons/pi";
import ReactQuill from "react-quill";
import MultiSelectImage from "@/components/MultiSelectImage";
import BarcodeScanner from "@/components/BarcodeScanner";
import { MdOutlineCategory, MdOutlineQrCodeScanner } from "react-icons/md";
import Loading from "@/assets/AllSvg";
import { IoCalendarClearOutline } from "react-icons/io5";
import truncateText from "@/utils/truncateText";
import { useAuthStore } from "@/store/useAuthStore";
import TextArea from "@/ui/TextArea";
import SelectModal from "@/components/SelectModal";
import { LuSquareUser, LuStore } from "react-icons/lu";
import useDebounce from "@/hooks/useDebounce";
import { dummyProductData as data } from "../../../database";
import { dummyStoreData as storeData } from "../../../database";
import { dummyVendorData as vendorData } from "../../../database";
import { dummyCategoryData as categoryData } from "../../../database";
import { FiEdit2 } from "react-icons/fi";

export default function AddProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const edit = location.state;
  const [files, setFiles] = useState();
  const [open, setOpen] = useState(edit ? false : true);
  const [done, setDone] = useState(false);
  const [scannedBarCode, setScannedBarCode] = useState();
  const [debouncedBarCode, setDebouncedBarCode] = useState("");
  const [selectedVendor, setSelectedVendor] = useState();
  const { user } = useAuthStore();
  const [selectedStore, setSelectedStore] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [error, setError] = useState();

  const [description, setDescription] = useState(edit?.description);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedBarCode(scannedBarCode);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [scannedBarCode]);

  let scannedBarCodeData = [];

  // 🏬 Store search
  const [storeSearch, setStoreSearch] = useState("");

  // 🧑‍🌾 Vendor search
  const [vendorSearch, setVendorSearch] = useState("");

  // 📂 Category search
  const [categorySearch, setCategorySearch] = useState("");

  const fieldSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    costPrice: Yup.string().required("Required"),
    sellingPrice: Yup.string().required("Required"),
    quantity: Yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(fieldSchema),
    defaultValues: {
      name: edit?.name,
      costPrice: edit?.costPrice,
      sellingPrice: edit?.sellingPrice,
      quantity: edit?.quantity,
    },
  });

  useEffect(() => {
    const specFields = {};
    const spec = edit?.specification ?? {};
    Object.keys(spec).forEach((key) => {
      specFields[`${key}_specification`] = spec[key];
    });
    if (edit) {
      reset({
        name: edit?.name,
        costPrice: edit?.costPrice,
        sellingPrice: edit?.sellingPrice,
        quantity: edit?.quantity,
        ...specFields,
      });

      setDescription(edit?.description);
      setSelectedVendor(edit?.vendor);
      setSelectedStore(edit?.store);
      setSelectedCategory(edit?.category);
    }
  }, [edit]);

  const productMutation = useProductMutation();
  const editScannedDataImages = edit?.images ?? scannedBarCodeData?.images;
  const onSubmitHandler = async (data) => {
    const specification = {};
    for (const key in data) {
      if (key.endsWith("_specification")) {
        const specKey = key.replace("_specification", "");
        specification[specKey] = data[key];
      }
    }
    const formData = new FormData();
    formData.append("barCode", scannedBarCode ?? edit?.barCode);
    edit && formData.append("id", edit?.id);
    formData.append("description", description ?? edit?.description);
    formData.append("vendor", JSON.stringify(selectedVendor ?? edit?.vendor));
    formData.append("store", JSON.stringify(selectedStore ?? edit?.store));
    formData.append("specification", JSON.stringify(specification));
    formData.append(
      "category",
      JSON.stringify(selectedCategory ?? edit?.category)
    );
    Object.entries(data).forEach(([key, value]) => {
      if (!key.endsWith("_specification")) {
        formData.append(key, value);
      }
    });
    if (editScannedDataImages) {
      formData.append("images", editScannedDataImages);
    } else if (files) {
      files.forEach((file) => formData.append("images", file));
    }
    try {
      await productMutation.mutateAsync([
        edit ? "patch" : "post",
        edit ? `update/${edit.id}` : "create/",
        formData,
      ]);
      toast.success(`Product ${edit ? "edited" : "added"} successfully`);
      reset();
      setSelectedCategory("");
      setDebouncedBarCode("");
      setDescription("");
      setFiles();
      !edit && setOpen(true);
      edit && navigate("/product");
      scannedBarCodeData = [];
      !edit && setDone(!done);
    } catch (err) {
      console.error("Submit error:", err);
      setError(err?.response?.data?.error);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFiles();
    reset({
      name: "",
      costPrice: "",
      sellingPrice: "",
      quantity: "",
    });
    setDescription("");
    setScannedBarCode("");
    reset();
  };

  const productNameFields = [
    {
      registerName: "name",
      placeHolder: "Enter product name",
      className: "",
      defaultValue: "",
      error: errors?.name?.message ?? error?.name,
      label: "Product Name",
    },
  ];

  const productPricesFields = [
    {
      registerName: "quantity",
      placeHolder: "Enter quantity",
      className: "",
      defaultValue: "",
      error: errors?.quantity?.message ?? error?.quantity,
      label: "Quantity",
      type: "number",
    },
    {
      registerName: "costPrice",
      placeHolder: "Enter cost price",
      className: "",
      defaultValue: "",
      error: errors?.costPrice?.message ?? error?.costPrice,
      label: "Cost price",
      type: "number",
    },
    {
      registerName: "sellingPrice",
      placeHolder: "Enter selling price",
      className: "",
      defaultValue: "",
      error: errors?.sellingPrice?.message ?? error?.sellingPrice,
      label: "Selling price",
      type: "number",
    },
  ];

  const selectModalFields = [
    {
      data: storeData?.data,
      setSelectedField: setSelectedStore,
      selectedField: selectedStore,
      setSearchText: setStoreSearch,
      title: "Store",
      show: user?.data?.role === "Admin",
      icon: <LuStore />,
      error: errors?.store?.message ?? error?.store,
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
      error: errors?.vendor?.message ?? error?.vendor,
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
      error: errors?.category?.message ?? error?.category,
      className: "",
    },
  ];
  return (
    <div className="flex justify-between gap-3 items-start p-6 relative h-full">
      <MdOutlineQrCodeScanner
        onClick={() => setOpen(true)}
        className="absolute cursor-pointer bg-white text-2xl border p-1 w-8 h-8 top-0 right-0"
      />
      <BarcodeScanner
        asChild
        open={open}
        setOpen={setOpen}
        setScannedBarCode={setScannedBarCode}
      />
      <form
        className="w-2/3 no-scrollbar bg-white p-6 rounded-md h-[82vh] overflow-auto flex flex-col justify-between"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="flex flex-col gap-2 w-full shadow-[inset_0_-6px_6px_-3px_rgba(0,0,0,0.2)] overflow-auto no-scrollbar">
          <div className="flex gap-x-4">
            {edit || editScannedDataImages ? (
              <div>
                <p className="text-[#344054] leading-5 font-medium text-sm mb-1">
                  Images
                </p>
                <div className="flex items-center gap-2 ">
                  {editScannedDataImages?.map((item) => {
                    return (
                      <img
                        className="w-12 h-12 border border-gray-200 rounded-lg p-[2px]"
                        src={item}
                        alt=""
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <MultiSelectImage setFiles={setFiles} files={files} />
            )}
            <div className="w-full">
              {productNameFields?.map((item) => {
                return (
                  <TextArea
                    register={register}
                    name={item?.registerName}
                    placeholder={item?.placeHolder}
                    className={`w-full text-sm text-gray-500 min-h-12 ${item?.className}`}
                    defaultValue={item?.defaultValue}
                    error={item?.error}
                    label={item?.label}
                  />
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-x-2">
            {productPricesFields?.map((item) => {
              return (
                <InputField
                  register={register}
                  name={item?.registerName}
                  placeholder={item?.placeHolder}
                  className={`w-full text-sm text-gray-500 ${item?.className}`}
                  defaultValue={item?.defaultValue}
                  error={item?.error}
                  label={item?.label}
                  type={item?.type}
                />
              );
            })}
          </div>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-x-2">
            {selectModalFields?.map((item) => {
              if (item?.show)
                return (
                  <SelectModal
                    data={item?.data}
                    setSelectedField={item?.setSelectedField}
                    setSearchText={item?.setSearchText}
                    asChild
                    title={item?.title}
                  >
                    <div>
                      <p className="text-[#344054] leading-5 font-medium text-sm mb-1">
                        Select {item?.title}
                        <span className="text-red-600"> *</span>
                      </p>
                      <p
                        className={`border px-3 flex items-center gap-[6px] text-sm  cursor-pointer hover:drop-shadow-lg bg-white h-8 text-center  border-gray-300 drop-shadow-sm  text-gray-700 focus-visible:border-gray-700 ${item?.className}`}
                      >
                        <div className="text-sm text-gray-400">
                          {item?.icon}
                        </div>
                        {item?.selectedField
                          ? item?.selectedField?.name
                          : item?.title}
                      </p>
                      <p className="text-red-600 text-xs">{item?.error}</p>
                    </div>
                  </SelectModal>
                );
            })}
          </div>
          <p className="text-[#344054] leading-5 font-medium text-sm  w-[100px]">
            Specifications
          </p>
          <div
            className={`${
              !selectedCategory?.specification &&
              "border border-dashed border-gray-400 h-full min-h-[140px]"
            } `}
          >
            {selectedCategory?.specification ? (
              <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                {selectedCategory?.specification?.map((item) => {
                  const key = smallLetter(item); // e.g., "have", "okey"
                  const defaultValue =
                    scannedBarCodeData?.specification?.[key] ?? "";

                  return (
                    <InputField
                      key={key}
                      register={register}
                      name={`${key}_specification`}
                      placeholder={`Enter ${item} details`}
                      className="w-full text-sm text-gray-500"
                      defaultValue={defaultValue}
                      error={errors?.[`${key}_specification`] ?? ""}
                      label={capitalizeFirstLetter(item)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="h-full w-full  text-center gap-1 text-xs font-medium text-gray-500 flex flex-col items-center justify-center">
                <PiCalendarBlank className="border p-[6px] rounded-full bg-gray-100 w-[36px] h-[36px]" />
                Choose category to get <br />
                specification fields
              </div>
            )}
          </div>
          <p className="text-[#344054] leading-5 font-medium text-sm ">
            Description
          </p>
          <ReactQuill
            className="h-[110px] w-full "
            value={description}
            onChange={setDescription}
          />
        </div>
        <div className="flex items-center justify-end">
          <div className="grid  grid-cols-2 w-1/2 border mt-6 gap-2 md:w-full">
            <Button
              buttonName={"Clear"}
              noFill
              danger
              className={"w-full"}
              handleButtonClick={(e) => {
                e.preventDefault();
                handleClear(e);
              }}
            />
            <Button
              className={"w-full "}
              handleButtonClick={() => {}}
              buttonName={`${edit ? "Edit" : "Add"} Product`}
            />
          </div>
        </div>
      </form>
      <div className="w-1/3 bg-white px-4  py-2 rounded-md h-[82vh] overflow-auto flex flex-col border-b-4">
        <p className="font-semibold text-gray-600">Last Added items</p>
        {data?.data?.length ? (
          <div className="flex flex-col gap-2 h-full border-b-4 overflow-auto no-scrollbar">
            {data?.data?.map((item, index) => (
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

                <FiEdit2
                  // onClick={() => handleRemoveProduct(index)}
                  className="absolute top-0 right-0  p-[4px] cursor-pointer font-bold text-xl bg-blue-500 text-white"
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
                        Qty:
                        {parseFloat(item.quantity) || 0}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-red-500 font-semibold">
                        Cost Price: ${item?.costPrice}
                      </label>
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
              No product to show
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
