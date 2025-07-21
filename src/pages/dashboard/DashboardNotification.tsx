import truncateText from "@/utils/truncateText";
import { useState } from "react";

export default function DashboardNotification() {
  const [active, setActive] = useState("push notification");
  const data = [];

  return (
    <div className="py-5 bg-white">
      <div className="flex flex-col gap-5 px-5">
        <div className="flex gap-4">
          <div
            className={`text-sm font-medium cursor-pointer ${
              active === "push notification"
                ? "text-[#4365a7] border-b-2 border-[#4365a7]"
                : "text-[#4D4D4D]"
            }`}
            onClick={() => setActive("push notification")}
          >
            Push Notifications
          </div>
          <div
            className={`text-sm font-medium cursor-pointer ${
              active === "announcement"
                ? "text-[#4365a7] border-b-2 border-[#4365a7]"
                : "text-[#4D4D4D]"
            }`}
            onClick={() => setActive("announcement")}
          >
            Announcements
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {data?.data
            ?.filter((item) => item?.notificationType === active)
            ?.map((item, index) => (
              <div
                key={index}
                className="bg-[#f0f4f8] px-5 py-2 flex justify-between"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-[#4D4D4D] text-base font-semibold">
                    {truncateText(item?.title, 40)}
                  </h2>
                  <p className="text-[#666666] text-sm font-normal">
                    {truncateText(item?.description, 100)}
                  </p>
                </div>
              </div>
            ))}
        </div>
        {(active == "announcement" || !data?.data) && (
          <p className="text-center my-20">No data to show</p>
        )}
      </div>
    </div>
  );
}
