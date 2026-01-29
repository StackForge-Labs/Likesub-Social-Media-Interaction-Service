"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
    ShoppingCart,
    ChevronDownIcon,
    LayoutDashboard,
    Users,
    Package,
    Headset,
    Dot,
    PlusCircle,
    Ban,
    ShieldCheck
} from "lucide-react";
import { useSidebar } from "@/contexts/SidebarContext";
import Image from "next/image";

interface NavItemType {
    name: string,
    icon: React.ReactNode,
    path?: string,
    subItems?: {
        name: string,
        path: string,
        icon: React.ReactNode,
        new?: boolean
    }[]
};

const adminMenuItems: NavItemType[] = [
    {
        name: "Dashboard",
        icon: <LayoutDashboard size={18} />,
        path: "/admin/dashboard",
    },
    {
        name: "Addons",
        icon: <PlusCircle size={18} />,
        path: "/admin/addons/all"
    },
    {
        name: "Block IP",
        icon: <Ban size={18} />,
        path: "/admin/block-ip"
    },
];

const adminServiceItems: NavItemType[] = [
    {
        name: "TUANORI",
        icon: <ShoppingCart size={18} />,
        subItems: [
            {
                name: "Chuyên mục cha",
                path: "/admin/services/parents",
                icon: <Dot size={18} />
            },
            {
                name: "Chuyên mục con",
                path: "/admin/services/children",
                icon: <Dot size={18} />
            },
            {
                name: "Gói dịch vụ",
                path: "/admin/services/packages",
                icon: <Dot size={18} />
            },
        ],
    },
];

const adminManagementsItems: NavItemType[] = [
    {
        name: "Thành viên",
        icon: <Users size={18} />,
        path: "/admin/users"
    },
    {
        name: "Tickets",
        icon: <Headset size={18} />,
        path: "/admin/tickets"
    },
    {
        name: "Admin Role",
        icon: <ShieldCheck size={18} />,
        path: "/admin/roles"
    },
    {
        name: "Nạp tiền",
        icon: <ShoppingCart size={18} />,
        subItems: [
            {
                name: "Ngân hàng",
                path: "/admin/recharge/bank",
                icon: <Dot size={18} />
            },
            {
                name: "Nạp thẻ cào",
                path: "/admin/recharge/scratch-card",
                icon: <Dot size={18} />
            },
            {
                name: "Crypto USDT",
                path: "/admin/recharge/crypto-usdt",
                icon: <Dot size={18} />
            },
            {
                name: "Ví THESIEURE",
                path: "/admin/recharge/thesieure",
                icon: <Dot size={18} />
            },
            {
                name: "Paypal",
                path: "/admin/recharge/paypal",
                icon: <Dot size={18} />
            },
            {
                name: "XiPay (AliPay, WechatPay)",
                path: "/admin/recharge/xipay",
                icon: <Dot size={18} />
            },
            {
                name: "Korapay Africa",
                path: "/admin/recharge/korapay",
                icon: <Dot size={18} />
            },
            {
                name: "Tmweasyapi Thailand",
                path: "/admin/recharge/tmweasyapi",
                icon: <Dot size={18} />
            },
            {
                name: "OpenPix Brazil",
                path: "/admin/recharge/open-pix",
                icon: <Dot size={18} />
            },
            {
                name: "Bakong Wallet Cambodia",
                path: "/admin/recharge/bakong-wallet",
                icon: <Dot size={18} />
            },
            {
                name: "Manual Payment",
                path: "/admin/recharge/manual-payment",
                icon: <Dot size={18} />
            },
        ],
    },
    {
        name: "Sản phẩm",
        icon: <Package size={18} />,
        subItems: [
            {
                name: "Danh sách sản phẩm",
                path: "/admin/products",
                icon: <Dot size={18} />
            },
            {
                name: "Thêm mới sản phẩm",
                path: "/admin/add-product",
                icon: <Dot size={18} />
            },
        ],
    },
    {
        name: "Đơn hàng",
        icon: <ShoppingCart size={18} />,
        subItems: [
            {
                name: "Tất cả đơn hàng",
                path: "/admin/invoices",
                icon: <Dot size={18} />
            },
            {
                name: "Thông tin đơn hàng",
                path: "/admin/invoice-detail",
                icon: <Dot size={18} />
            },
            {
                name: "Thêm đơn hàng",
                path: "/admin/create-invoice",
                icon: <Dot size={18} />
            },
        ],
    },
];

function AdminSidebar() {
    const pathname = usePathname();
    const { isExpanded, isHovered, setIsHovered } = useSidebar();

    const [openSubmenu, setOpenSubmenu] = useState<{
        type: "main" | "services" | "management";
        index: number;
    } | null>(null);

    const [isMounted, setIsMounted] = useState(typeof window !== 'undefined');

    const isActive = useCallback((path: string) => {
        if (!path) return false;
        return pathname === path;
    }, [pathname]);

    const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});

    const handleSubmenuToggle = (index: number, menuType: "main" | "services" | "management") => {
        setOpenSubmenu((prev) => {
            if (prev &&
                prev.type === menuType &&
                prev.index === index
            ) {
                return null
            }

            return {
                type: menuType,
                index
            }
        })
    }

    useEffect(() => {
        let subMenuMatched = false;

        ["main", "services", "management"].map(type => {
            const items = type === "main"
                ? adminMenuItems
                : type === "services" ? adminServiceItems
                    : adminManagementsItems;

            items.map((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubmenu({
                                type: type as "main" | "services" | "management",
                                index
                            });
                            subMenuMatched = true;
                        }
                    })
                };
            });

            if (!subMenuMatched) setOpenSubmenu(null);

        })
    }, [pathname, isActive]);

    useEffect(() => {
        if (openSubmenu !== null) {
            const key = `${openSubmenu.type}-${openSubmenu.index}`;

            if (subMenuRefs.current[key]) {
                setSubMenuHeight(prev => ({
                    ...prev,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubmenu]);

    const renderMenuItems = (
        navItems: NavItemType[],
        menuType: "main" | "services" | "management"
    ) => {
        return (
            <ul className="flex flex-col gap-2">
                {navItems.map((nav, index) => (
                    <li key={nav.name}>
                        {nav.subItems ? (
                            <button
                                onClick={() => handleSubmenuToggle(index, menuType)}
                                className={`relative flex items-center w-full gap-3 px-4 py-3 font-medium rounded-xl text-[16px]! group ${openSubmenu?.type === menuType && openSubmenu?.index === index
                                    ? "bg-[#1E40af] text-white"
                                    : "text-slate-600 group-hover:text-slate-500 hover:bg-blue-50"
                                    } cursor-pointer ${!isExpanded && !isHovered
                                        ? "justify-center"
                                        : "justify-start"
                                    }`}
                            >
                                <span
                                    className={`${openSubmenu?.type === menuType && openSubmenu?.index === index
                                        ? "text-white"
                                        : "text-slate-600 group-hover:text-slate-500"
                                        }`}
                                >
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered) && (
                                    <span
                                        className={`${openSubmenu?.type === menuType && openSubmenu?.index === index
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
                                    <span className={`${isActive(nav.path)
                                        ? "text-white"
                                        : "text-slate-600 group-hover:text-slate-500"
                                        }`}>
                                        {nav.icon}
                                    </span>
                                    <span className={`${isActive(nav.path)
                                        ? "text-white"
                                        : "text-slate-600 group-hover:text-slate-500"
                                        }`}>
                                        {nav.name}
                                    </span>
                                </Link>
                            )
                        )}

                        {/* Nav Sub Item */}
                        {nav.subItems && (isExpanded || isHovered) && (
                            <div
                                ref={(el) => {
                                    subMenuRefs.current[`${menuType}-${index}`] = el;
                                }}
                                className="overflow-hidden transition-all duration-300"
                                style={{
                                    height:
                                        openSubmenu?.type === menuType && openSubmenu?.index === index
                                            ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                            : "0px",
                                }}
                            >
                                <ul className="mt-2 space-y-1 text-left ml-11">
                                    {nav.subItems.map(subItem => (
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
        )
    }

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
                            <h2 className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}>
                                MAIN
                            </h2>
                            {/* render main items */}
                            {renderMenuItems(adminMenuItems, "main")}

                            {/* Service Item */}
                            <h2 className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}>
                                Dịch vụ
                            </h2>
                            {/* render main items */}
                            {renderMenuItems(adminServiceItems, "services")}

                            {/* Managements Item */}
                            <h2 className={`text-xs uppercase flex leading-5 text-slate-400 font-medium`}>
                                Quản lý
                            </h2>
                            {/* render main items */}
                            {renderMenuItems(adminManagementsItems, "management")}
                        </div>
                    </nav>
                </div>
            )}
        </aside>
    )
}

export default AdminSidebar;