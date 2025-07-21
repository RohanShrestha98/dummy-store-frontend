import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import InputField from "@/ui/InputField";
import { useState } from "react";
import { LuStore } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";

export default function SelectModal({
  asChild,
  children,
  title,
  setSearchText,
  setSelectedField,
  data,
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="max-w-[525px]  min-w-[500px]  bg-[#FAFAFA] ">
        <DialogTitle className="text-[#22244D] font-medium text-base flex mt-3 items-center justify-between">
          <p>Select {title}</p>
          <InputField
            placeholder={`Search ${title} ...`}
            className={"w-[180px] px-1 border text-gray-500 border-gray-300"}
            setSearchText={setSearchText}
          />
        </DialogTitle>
        <div className="flex flex-col   min-h-[280px] gap-2">
          <div className="grid grid-cols-3 gap-2 text-xs font-medium">
            <div
              onClick={() => {
                setSelectedField("");
                setOpen(!open);
              }}
              className="border h-fit border-gray-400 bg-red-50 hover:bg-red-700 hover:text-white  flex gap-2 p-2 cursor-pointer  items-center"
            >
              <RxCross2 size={15} />
              <p className="text-sm ">Clear</p>
            </div>
            {data?.map((item) => {
              return (
                <div
                  onClick={() => {
                    setSelectedField(item);
                    setOpen(!open);
                  }}
                  className="border h-fit border-gray-400 bg-blue-50 hover:bg-blue-800 hover:text-white  flex gap-2 p-2 cursor-pointer   items-center"
                >
                  <LuStore />
                  <p className="text-sm ">{item?.name}</p>{" "}
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
