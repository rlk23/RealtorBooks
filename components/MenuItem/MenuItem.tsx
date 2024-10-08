import clsx from "clsx";
import SidebarIcons from "../SidebarIcons";
import Link from "next/link";

type Props = {
  item: {
    id: string;
    title: string;
    notifications: boolean | number;
    link: string;
    iconId: string;
  };
  onClick: (id: string) => void;
  selected: string;
};

export default function MenuItem({
  item: { id, title, notifications, link, iconId },
  onClick,
  selected,
}: Props) {
  return (
    <Link href={link}>
      <div
        className={clsx(
          "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
          selected === id ? "sidebar-item-selected" : "sidebar-item"
        )}
        onClick={() => onClick(id)}
      >
        <SidebarIcons id={iconId} />
        <div className="block sm:hidden xl:block ml-2">{title}</div>
        <div className="block sm:hidden xl:block flex-grow" />
        {notifications && (
          <div className="flex sm:hidden xl:flex bg-pink-600 w-5 h-5 items-center justify-center rounded-full mr-2">
            <div className="text-white text-sm">{notifications}</div>
          </div>
        )}
      </div>
    </Link>
  );
}
