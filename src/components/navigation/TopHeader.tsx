import React from "react";
import { cn } from "../../lib/utils";
import useUserDetails from "../../stores/userStore";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { useApiConfig } from "../../hooks/api";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export interface AnnouncementProps {
  id: number;
  description: string;
  title: string | null;
  link: string | null;
  image: string;
  announcement_by: string;
  announcement_by_image: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

const TopHeader = () => {
  const config = useApiConfig({
    method: "get",
    url: "get-announcement",
  });

  const fetchAnnoucement = async () => {
    const response = await axios.request(config);
    if (response && response.status === 200) {
      return response;
    } else {
      throw new Error("Something went wrong");
    }
  };

  const { data, status } = useQuery({
    queryKey: ["annoucements"],
    queryFn: fetchAnnoucement,
  });

  const annoucement = data?.data.announcement as AnnouncementProps[];
  const textArray = annoucement?.map((item) => item.description) ?? [];

  const [textIndex, setTextIndex] = React.useState(0);
  const { user, fetchKycDetails, fetchKycStatus } = useUserDetails();

  // this is to cycle the header text
  React.useEffect(() => {
    if (!textArray.length) return;

    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [textArray]);

  React.useEffect(() => {
    if (user) {
      fetchKycDetails();
      fetchKycStatus();
    }
  }, [user]);

  if (status === "pending") {
    return (
      <div className="w-full bg-primary md:h-[40px] h-[32px] flex items-center justify-center">
        <Loader2 className="animate-spin size-5" />
      </div>
    );
  }

  if (status === "success" && textArray.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full bg-primary md:h-[40px] h-[32px] flex items-center justify-center",
        user?.account_status === "Unverified" ? "bg-[#E41D0333]/20" : ""
      )}
    >
      <div
        className={cn(
          "h-[16px] w-[380px] md:h-[18px] xl:w-[1250px] md:w-[85%] relative overflow-hidden text-white font-DMSans",
          user?.account_status === "Unverified" ? "text-[#E41D03]" : ""
        )}
      >
        {user?.account_status === "Verified" ? (
          <React.Fragment>
            {textArray.slice(0, 3).map((text, i) => (
              <p
                key={i}
                className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                  textIndex === i ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {text}
              </p>
            ))}
          </React.Fragment>
        ) : user?.account_status === "Unverified" ? (
          <div className="flex items-center gap-2">
            <HiOutlineInformationCircle className="size-5" />
            <p className="xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px]">
              Please complete Identity Verification to have access to our full
              range of products & services
            </p>
          </div>
        ) : (
          <React.Fragment>
            {textArray.slice(0, 3).map((text, i) => (
              <p
                key={i}
                className={`line-clamp-1 xl:text-[14px] xl:leading-[18px] text-[10px] leading-[15px] absolute top-0 left-0 transition-transform duration-1000 ease-in-out ${
                  textIndex === i ? "translate-y-0" : "translate-y-full"
                }`}
              >
                {text}
              </p>
            ))}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default TopHeader;
