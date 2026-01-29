import Link from "next/link"

function UserFooter() {
    return (
        <div className="bg-white border-t border-slate-200 h-16! shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between h-full px-6">
                {/* Left Side */}
                <p className="text-slate-400 text-sm">
                    © All Copyrights Reserved by <Link
                        target="_blank"
                        className="text-cyan-700 hover:underline cursor-pointer"
                        href={"https://tuanori.vn/"}
                    >
                        TUANORI.VN
                    </Link>
                </p>

                {/* Right Side */}
                <div className="flex gap-2">
                    <p className="text-slate-400 text-sm">
                        Software By{" "}
                        <Link
                            target="_blank"
                            href={"https://tuanori.vn/"}
                            className="text-cyan-700 hover:underline cursor-pointer">
                            TUANORI.VN
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserFooter