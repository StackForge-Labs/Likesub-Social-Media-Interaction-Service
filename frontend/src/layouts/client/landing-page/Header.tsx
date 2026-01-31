"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white backdrop-blur z-50 transition-shadow duration-300 ${isScrolled ? "shadow-lg" : ""
        }`}
    >
      <div className="w-full bg-[#1e40af] h-8.5 text-white flex items-center justify-center gap-2">
        <span className="text-[13px] font-medium">
          Tăng tương tác mạng xã hội - Nâng tầm thương hiệu của bạn
        </span>
        <Link
          href={"https://likesub.io.vn/"}
          className="font-bold text-[14px] border-b cursor-pointer"
        >
          Tìm hiểu thêm
        </Link>
      </div>

      <div className="container mx-auto py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="LIKESUB-VIP"
            width={150}
            height={100}
          />
        </div>
        {/* Menu + Actions */}
        <div className="flex items-center gap-4 font-medium text-sm">
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="/"
              className="relative text-[#71717A] font-bold transition px-1 group"
            >
              <span>TRANG CHỦ</span>
              <span className="pointer-events-none absolute left-0 -bottom-0.5 w-0 h-px bg-[#71717A] rounded transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/faq"
              className="relative text-[#71717A] font-bold transition px-1 group"
            >
              <span>FAQS</span>
              <span className="pointer-events-none absolute left-0 -bottom-0.5 w-0 h-px bg-[#71717A] rounded transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#features"
              className="relative text-[#71717A] font-bold transition px-1 group"
            >
              <span>TÀI LIỆU API</span>
              <span className="pointer-events-none absolute left-0 -bottom-0.5 w-0 h-px bg-[#71717A] rounded transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#benefits"
              className="relative text-[#71717A] font-bold transition px-1 group"
            >
              <span>ĐIỀU KHOẢN SỬ DỤNG</span>
              <span className="pointer-events-none absolute left-0 -bottom-0.5 w-0 h-px rounded transition-all duration-300 group-hover:w-full bg-[#71717A]"></span>
            </Link>
          </nav>
          <Link
            href="/login"
            className="bg-[#1e40af]! hover:opacity-80 px-4 py-2.5 rounded-sm font-semibold shadow transition-all duration-300 text-xs text-white"
          >
            SỬ DỤNG NGAY
          </Link>
        </div>
      </div>
    </header>
  );
}