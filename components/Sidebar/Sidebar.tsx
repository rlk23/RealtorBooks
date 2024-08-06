import { sidebarItems } from "@/data";
import { useSpring, config, animated } from "@react-spring/web";
import clsx from "clsx";
import { useState } from "react";
import Icon from "@/components/common/Icon";
import IconButton from "@/components/common/IconButton";
import MenuItem from "@/components/MenuItem";
import Image from "@/components/common/image";

type Props = {
  onSidebarHide: () => void;
  showSidebar: boolean;
};

export default function Sidebar({ onSidebarHide, showSidebar }: Props) {
  const [selected, setSelected] = useState("0");
  const { dashOffset, indicatorWidth, precentage } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 70,
    precentage: 77,
    from: { dashOffset: 113.113, indicatorWidth: 0, precentage: 0 },
    config: config.molasses,
  });

  return (
    <div
      className={clsx(
        "fixed inset-y-0 left-0 w-full sm:w-20 xl:w-60 sm:flex flex-col z-10 bg-custom-blue",
        showSidebar ? "flex" : "hidden"
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-top">
          <IconButton icon="res-react-dash-logo" className="w-10 h-10" />
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
            React
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <IconButton
            icon="res-react-dash-sidebar-close"
            className="block sm:hidden"
            onClick={onSidebarHide}
          />
        </div>
      </div>
      <div className="relative flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <button
          onClick={onSidebarHide}
          className="absolute left-full top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-1.5 z-20"
        >
          &lt;|&gt;
        </button>
        {/* Essential Items */}
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
          Essential Items
        </div>
        {sidebarItems[0].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={() => setSelected(i.id)}
            selected={selected}
          />
        ))}
        {/* Additional Tools */}
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
          Additional Tools
        </div>
        {sidebarItems[1].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={() => setSelected(i.id)}
            selected={selected}
          />
        ))}
        <div className="flex-grow" />
        {/* Personal Information */}
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block">
          Personal Information
        </div>
        {sidebarItems[2].map((i) => (
          <MenuItem
            key={i.id}
            item={i}
            onClick={() => setSelected(i.id)}
            selected={selected}
          />
        ))}
        <div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32">
          <div
            className="rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden"
            style={{
              backgroundImage:
                "url('https://assets.codepen.io/3685267/res-react-dash-usage-card.svg')",
            }}
          >
            <div className="block sm:hidden xl:block pt-3">
              <div className="font-bold text-gray-300 text-sm">Used Space</div>
              <div className="text-gray-500 text-xs">
                Admin updated 09:12 am November 08,2020
              </div>
              <animated.div className="text-right text-gray-400 text-xs">
                {precentage.to((i) => `${Math.round(i)}%`)}
              </animated.div>
              <div className="w-full text-gray-300">
                <svg
                  viewBox="0 0 100 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="5"
                    y1="5.25"
                    x2="95"
                    y2="5.25"
                    stroke="#3C3C3C"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <animated.line
                    x1="5"
                    y1="5.25"
                    x2={indicatorWidth}
                    y2="5.25"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="hidden sm:block xl:hidden ">
              <svg
                width="56"
                height="56"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="56" height="56" fill="#2C2C2D" />
                <path
                  d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                  stroke="#3C3C3C"
                  strokeWidth="6"
                />
                <animated.path
                  d="M 28 28 m 0, -18 a 18 18 0 0 1 0 36 a 18 18 0 0 1 0 -36"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeDasharray="113.113"
                  strokeDashoffset={dashOffset}
                  strokeWidth="6"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 sidebar-separator-bottom">
          <Image path="mock_faces_8" className="w-10 h-10" />
          <div className="block sm:hidden xl:block ml-2 font-bold ">
            Jerry Wilson
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          <Icon
            path="res-react-dash-options"
            className="block sm:hidden xl:block w-3 h-3"
          />
        </div>
      </div>
    </div>
  );
}
