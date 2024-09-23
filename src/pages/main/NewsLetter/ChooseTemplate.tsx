import Tag from "@/components/dashboard/Tag";
import { useState } from "react";
import TemplateListCard from "./components/TemplateListCard";

import women_day_pic from "@/assets/news_letter_template/womens_day.svg";
import new_month_pic from "@/assets/news_letter_template/new_month.svg";
import connected_pic from "@/assets/news_letter_template/stay_connected.svg";
export default function ChooseTemplate() {
  const [templates] = useState([
    {
      subject: "International Women's Day",
      heading: "Welcome ! 🎉",
      image: women_day_pic,
      body: "We're thrilled to have you join our community dedicated to empowering and connecting women across the nation.",
    },
    {
      subject: "Happy New Month",
      heading: "The “ember” season🌸",
      image: new_month_pic,
      bg: "bg-[#F0EBD6]",
      body: "As we step into this new month, we want to take a moment to wish you warmth, joy, and success. Each new month brings fresh opportunities and new beginnings, and we’re thrilled to be on this journey with you. At Women Hub, we believe in the power of connection and ",
    },
    {
      subject: "Stay Connected, Stay Empowered",
      heading: "",
      image: connected_pic,
      body: `Dear Jane, We're thrilled to announce the launch of a brand-new feature on Women Hub that's designed to keep you more connected and informed than ever before!`,
    },
  ]);
  return (
    <div className="w-full mx-auto px-5 py-10 bg-white rounded-lg">
      <Tag title="Choose a Template" color="bg-[#B5E4CA]" />
      <div className="flex gap-5 items-start mt-16 ">
        {templates.map((template) => (
          <TemplateListCard template={template} />
        ))}
      </div>
    </div>
  );
}
