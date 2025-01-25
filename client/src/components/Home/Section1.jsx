import React from "react";
import { Card } from "../cards/Card";
import {
  CalendarIcon,
  UserGroupIcon,
  BuildingStorefrontIcon,
  BellIcon,
} from "@heroicons/react/24/outline";

export const Section1 = () => {
  const cards = [
    {
      title: "Seamless Event Creation",
      desc: "For organizers to set up events effortlessly.",
      icon: CalendarIcon,
    },
    // {
    //   title: "Event Booking Made Simple",
    //   desc: "Attendees can browse and book events instantly.",
    //   icon: UserGroupIcon,
    // },
    {
      title: "Vendor Opportunities",
      desc: "Vendors can list services and grow their businesses.",
      icon: BuildingStorefrontIcon,
    },
    // {
    //   title: "Real-Time Notifications",
    //   desc: "Stay updated with instant alerts.",
    //   icon: BellIcon,
    // },
  ];
  return (
    <div className="min-h-[350px] bg-amber-100 py-10 px-6">
        <h2 className="font-poppins text-4xl font-medium text-center  mb-5">
          Why Choose Us?
        </h2>

      <div className="flex items-center justify-center">
        <div className="mt-6 flex justify-center flex-col md:flex-row gap-8">
          {cards.map(({ title, desc, icon }, index) => (
            <Card key={index} title={title} description={desc} Icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};
