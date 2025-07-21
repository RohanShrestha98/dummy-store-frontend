import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/ui/Button";
import InputField from "@/ui/InputField";
import { useForm } from "react-hook-form";
import { useStoreMutation } from "@/hooks/useMutateData";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import SelectTime from "@/utils/selectTime";
import { useAuthStore } from "@/store/useAuthStore";

export default function AddStoreModal({
  asChild,
  children,
  edit = false,
  editData,
}) {
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const [hasSubmittedClick, setHasSubmittedClick] = useState(false);
  const [error, setError] = useState("");
  const [selectedOpenTime, setSelectedOpenTime] = useState();
  const [selectedCloseTime, setSelectedCloseTime] = useState();

  const fieldSchema = Yup.object().shape({
    name: Yup.string()
      .required("Required")
      .max(36, "Must be 36 characters or less"),
    address: Yup.string().required("Required"),
    storeNumber: Yup.string().required("Required"),
    tax: Yup.string().required("Required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(fieldSchema),
    defaultValues: {
      name: editData?.name ?? "",
      address: editData?.address ?? "",
      storeNumber: editData?.storeNumber ?? "",
      tax: editData?.tax ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: editData?.name ?? "",
      address: editData?.address ?? "",
      storeNumber: editData?.storeNumber ?? "",
      tax: editData?.tax ?? "",
    });
    setError();
  }, [editData, reset, open]);

  const handleClear = (e) => {
    e.preventDefault();
    reset();
  };

  const storeMutation = useStoreMutation();

  const onSubmitHandler = async (data) => {
    const postData = {
      ...data,
      open: selectedOpenTime,
      close: selectedCloseTime,
    };
    try {
      await storeMutation.mutateAsync([
        `${edit ? "patch" : "post"}`,
        edit ? `update/${editData?.id}` : "create/",
        postData,
      ]);
      setHasSubmittedClick(false);
      setOpen(false);
      reset();
      setError();
      toast.success(`Store ${edit ? "updated" : "added"} successfully`);
    } catch (err) {
      console.log("err", err);
      toast.error(err?.response?.data?.msg);
      setError(err?.response?.data);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  min-w-[580px] bg-[#FAFAFA]">
        <DialogTitle className="text-[#22244D] font-medium text-base">
          {edit ? "Edit" : "Add"} Store
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="flex flex-col gap-2">
            <div className={`grid grid-cols-2 gap-2`}>
              <InputField
                register={register}
                name="name"
                placeholder="Enter store name"
                className="w-full text-sm text-gray-500"
                defaultValue=""
                required
                label="Store name"
                error={errors?.name?.message ?? error?.name}
              />
              {!edit && (
                <InputField
                  register={register}
                  required
                  name="storeNumber"
                  placeholder="Enter store number"
                  className="w-full text-sm text-gray-500"
                  defaultValue=""
                  label="Store number"
                  error={errors?.storeNumber?.message ?? error?.storeNumber}
                />
              )}
              <InputField
                register={register}
                name="address"
                placeholder="Enter store address"
                className="w-full text-sm text-gray-500"
                defaultValue=""
                required
                label="Address"
                error={errors?.address?.message ?? error?.address}
              />
              <InputField
                register={register}
                required
                name="tax"
                placeholder="Enter tax(%)"
                className="w-full text-sm text-gray-500"
                defaultValue=""
                label="Tax"
                type="number"
                error={errors?.tax?.message ?? error?.tax}
              />
            </div>

            <SelectTime
              label={"Store Open Time"}
              setSelectedTime={setSelectedOpenTime}
            />
            <SelectTime
              defaultTime="22:00"
              label={"Store Close Time"}
              setSelectedTime={setSelectedCloseTime}
            />
          </div>
          <div className="grid grid-cols-2 w-full mt-10 gap-2">
            <Button
              buttonName={`${edit ? "Reset" : "Clear"}`}
              className={"w-full "}
              danger
              handleButtonClick={(e) => handleClear(e)}
              icon={""}
            />
            <Button
              type="submit"
              // disabled={user?.data?.storeLimit <= storeCount?.total}
              buttonName={`${edit ? "Edit Store" : "Add Store"}`}
              handleButtonClick={() => {
                setHasSubmittedClick(true);
              }}
              className={`w-full`}
              icon={""}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
