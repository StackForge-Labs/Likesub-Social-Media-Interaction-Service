"use client";

import Link from "next/link";

import { useSidebar } from "@/contexts/SidebarContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import {
    ShoppingCart,
    Wallet,
    PackageCheck,
    BadgeDollarSign,
    Link2,
    LifeBuoy,
    FileCode2,
    Globe,
    MessageCircle,
    ShoppingBag,
    Facebook,
    Youtube,
    Instagram,
    ChevronDownIcon,
    House,
} from "lucide-react";
import Image from "next/image";

interface NavItemType {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: {
        name: string;
        path: string;
        new?: boolean;
    }[];
}

const navItems: NavItemType[] = [
    {
        name: "Trang chủ",
        icon: <House size={20} />,
        path: "/home",
    },
    {
        name: "Tạo đơn hàng",
        icon: <ShoppingCart size={20} />,
        path: "/create-order",
    },
    {
        name: "Nạp tiền",
        icon: <Wallet size={20} />,
        path: "/recharge",
    },
    {
        name: "Đơn hàng đã mua",
        icon: <PackageCheck size={20} />,
        path: "/order-histories",
    },
    {
        name: "Bảng giá dịch vụ",
        icon: <BadgeDollarSign size={20} />,
        path: "/service-pricing",
    },
    {
        name: "Tiếp thị liên kết",
        icon: <Link2 size={20} />,
        path: "/affiliate",
    },
];

const othersItems: NavItemType[] = [
    {
        name: "Yêu cầu hỗ trợ",
        icon: <LifeBuoy size={20} />,
        path: "/support-request",
    },
    {
        name: "Tài liệu API",
        icon: <FileCode2 size={20} />,
        path: "/api-docs",
    },
    {
        name: "Tạo web riêng",
        icon: <Globe size={20} />,
        path: "/custom-website",
    },
];

const servicesItems: NavItemType[] = [
    {
        name: "Dịch vụ Facebook",
        icon: <Facebook size={20} />,
        subItems: [
            { name: "Like bài viết", path: "/services/facebook/like" },
            { name: "Follow trang", path: "/services/facebook/follow" },
            { name: "Comment bài viết", path: "/services/facebook/comment" },
            { name: "Share bài viết", path: "/services/facebook/share" },
        ],
    },
    {
        name: "Dịch vụ TikTok",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 7.5a6.5 6.5 0 0 1-5-2.4V15a5 5 0 1 1-5-5h1v3a2 2 0 1 0 2 2V2h3a6.5 6.5 0 0 0 5 5.5Z" />
            </svg>
        ),
        subItems: [
            { name: "Follow kênh", path: "/services/tiktok/follow" },
            { name: "Like video", path: "/services/tiktok/like" },
            { name: "View video", path: "/services/tiktok/view" },
            { name: "Comment video", path: "/services/tiktok/comment" },
        ],
    },
    {
        name: "Dịch vụ Youtube",
        icon: <Youtube size={20} />,
        subItems: [
            { name: "Subscribe kênh", path: "/services/youtube/subscribe" },
            { name: "View video", path: "/services/youtube/view" },
            { name: "Like video", path: "/services/youtube/like" },
        ],
    },
    {
        name: "Dịch vụ Instagram",
        icon: <Instagram size={20} />,
        subItems: [
            { name: "Follow", path: "/services/instagram/follow" },
            { name: "Like bài viết", path: "/services/instagram/like" },
            { name: "View story", path: "/services/instagram/story-view" },
        ],
    },
    {
        name: "Dịch vụ Threads",
        icon: <MessageCircle size={20} />,
        subItems: [
            { name: "Follow", path: "/services/threads/follow" },
            { name: "Like bài viết", path: "/services/threads/like" },
        ],
    },
    {
        name: "Dịch vụ Lazada",
        icon: <ShoppingBag size={20} />,
        subItems: [
            { name: "Follow shop", path: "/services/lazada/follow-shop" },
            { name: "Like sản phẩm", path: "/services/lazada/like-product" },
        ],
    },
];

function UserSidebar() {
    const pathname = usePathname();

    const { isExpanded, isHovered, setIsHovered } = useSidebar();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "menu" | "others" | "services";
        index: number;
    } | null>(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const isActive = useCallback(
        (path: string) => {
            if (!path) return false;
            return pathname === path;
        },
        [pathname]
    );

    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
        {}
    );

    const handleSubmenuToggle = (
        index: number,
        menuType: "menu" | "others" | "services"
    ) => {
        setOpenSubmenu((prev) => {
            if (prev && prev.type === menuType && prev.index === index) {
                return null;
            }

            return {
                type: menuType,
                index,
            };
        });
    };

    useEffect(() => {
        let subMenuMatched = false;

        ["menu", "others", "services"].map((type) => {
            const items =
                type === "menu"
                    ? navItems
                    : type === "others"
                        ? othersItems
                        : servicesItems;

            items.map((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: type as "menu" | "others" | "services",
                                index,
                            });
                            subMenuMatched = true;
                        }
                    });
                }
            });

            if (!subMenuMatched) setOpenSubmenu(null);
        });
    }, [pathname, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;

            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prev) => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const renderMenuItems = (
        navItems: NavItemType[],
        menuType: "menu" | "others" | "services"
    ) => {
        return (
            <ul className="flex flex-col gap-2">
                {navItems.map((nav, index) => (
                    <li key={nav.name}>
                        {nav.subItems ? (
                            <button
                                onClick={() =>
                                    handleSubmenuToggle(index, menuType)
                                }
                                className={`relative flex items-center w-full gap-3 px-4 py-3 font-medium rounded-xl text-[16px]! group ${openSubmenu?.type === menuType &&
                                    openSubmenu?.index === index
                                    ? "bg-[#1E40af] text-white"
                                    : "text-slate-600 group-hover:text-slate-500 hover:bg-blue-50"
                                    } cursor-pointer ${!isExpanded && !isHovered
                                        ? "justify-center"
                                        : "justify-start"
                                    }`}
                            >
                                <span
                                    className={`${openSubmenu?.type === menuType &&
                                        openSubmenu?.index === index
                                        ? "text-white"
                                        : "text-slate-600 group-hover:text-slate-500"
                                        }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered) && (
                                    <span
                                        className={`${openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                            ? "text-white"
                                            : "text-slate-600 group-hover:text-slate-500"
                                            }`}
                                    >
                                        {nav.name}
                                    </span>
                                )}
                                {(isExpanded || isHovered) && (
                                    <ChevronDownIcon
                                        className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                            ? "rotate-180 text-white"
                                            : ""
                                            }`}
                                    />
                                )}
                            </button>
                        ) : (
                            nav.path && (
                                <Link
                                    className={`flex items-center w-full gap-3 px-4 py-3 font-medium rounded-xl text-[16px] group
                                        ${isActive(nav.path)
                                            ? "bg-[#1E40AF]!"
                                            : "hover:bg-blue-50!"
                                        }
                                    `}
                                    href={nav.path}
                                >
                                    <span
                                        className={`${isActive(nav.path)
                                            ? "text-white"
                                            : "text-slate-600 group-hover:text-slate-500"
                                            }`}
                                    >
                                        {nav.icon}
                                    </span>
                                    <span
                                        className={`${isActive(nav.path)
                                            ? "text-white"
                                            : "text-slate-600 group-hover:text-slate-500"
                                            }`}
                                    >
                                        {nav.name}
                                    </span>
                                </Link>
                            )
                        )}

                        {/* Nav Sub Item */}
                        {nav.subItems && (isExpanded || isHovered) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[
                                        `${menuType}-${index}`
                                    ] = el;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height:
                                        openSubmenu?.type === menuType &&
                                            openSubmenu?.index === index
                                            ? `${subMenuHeight[
                                            `${menuType}-${index}`
                                            ]
                                            }px`
                                            : "0px",
                                }}
                            >
                                <ul className="mt-2 space-y-1 text-left ml-11">
                                    {nav.subItems.map((subItem) => (
                                        <li key={subItem.name}>
                                            <Link
                                                className={`flex items-center w-full gap-3 px-6 py-2.5 font-normal rounded-lg text-[14px] group text-slate-300 ${isActive(subItem.path)
                                                    ? "text-slate-800"
                                                    : "text-slate-600 group-hover:text-slate-500 hover:bg-blue-50!"
                                                    }`}
                                                href={subItem.path}
                                            >
                                                {subItem.name}
                                            </Link>

                                            {/* new */}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <aside className="sticky mt-1 lg:mt-0 flex flex-col top-0 px-5 left-0 w-72 bg-white border-r border-gray-200 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50" suppressHydrationWarning>
            {/* Logo */}
            <Link href={"/"} className="h-18 py-4.5 px-6 mb-4">
                <Image
                    src="/images/logo.png"
                    alt=""
                    className="w-auto h-auto"
                    width={200}
                    height={50}
                />
            </Link>

            {/* Nav Item */}
            {!isMounted ? (
                <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                    <nav className="mb-6">
                        <div className="flex flex-col gap-4 pt-6">
                            {/* Placeholder during SSR */}
                        </div>
                    </nav>
                </div>
            ) : (
                <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
                    <nav className="mb-6">
                        <div className="flex flex-col gap-4 pt-6">
                            {/* Menu Item */}
                            <h2
                                className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}
                            >
                                Quản lý chung
                            </h2>
                            {/* render menu items */}
                            {renderMenuItems(navItems, "menu")}

                            {/* Services Item */}
                            <h2
                                className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}
                            >
                                Dịch vụ
                            </h2>
                            {/* render menu items */}
                            {renderMenuItems(servicesItems, "others")}

                            {/* Others Item */}
                            <h2
                                className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}
                            >
                                Khác
                            </h2>
                            {/* render menu items */}
                            {renderMenuItems(othersItems, "others")}
                        </div>
                    </nav>
                </div>
            )}
        </aside>
    );
}

export default UserSidebar;
