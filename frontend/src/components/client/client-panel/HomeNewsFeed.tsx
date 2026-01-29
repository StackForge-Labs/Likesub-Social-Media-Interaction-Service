"use client";

import { useState, useEffect } from "react";

import {
    Heart,
    LoaderCircle,
    MessageCircle,
    Share2,
    TrendingUp
} from "lucide-react";

interface BlogPost {
    id: string;
    author: {
        name: string;
        avatar: string;
        role: string;
    };
    title: string;
    description: string;
    category: string;
    createdAt: string;
    likes: number;
    comments: number;
    isLiked: boolean;
    badge?: "trending" | "new";
    image?: string;
}

const MOCK_BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        author: {
            name: "LikeSub Team",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=LikeSub",
            role: "Administrator",
        },
        title: "🎉 Ra mắt dịch vụ tăng Follow TikTok siêu tốc - Chỉ 0.5đ/follow",
        description:
            "Chúng tôi vừa ra mắt gói dịch vụ tăng Follow TikTok với tốc độ xử lý nhanh nhất thị trường! Chỉ từ 0.5đ/follow, bạn có thể tăng độ uy tín cho tài khoản của mình. Hệ thống tự động xử lý 24/7, đảm bảo follow thật 100% từ người dùng Việt Nam...",
        category: "Dịch vụ mới",
        createdAt: "2 giờ trước",
        likes: 324,
        comments: 58,
        isLiked: false,
        badge: "new",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&q=80",
    },
    {
        id: "2",
        author: {
            name: "Marketing Expert",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Expert",
            role: "Social Media Specialist",
        },
        title: "Bí quyết tăng tương tác Facebook Fanpage lên 500% trong 30 ngày",
        description:
            "Chia sẻ chiến lược đã được kiểm chứng giúp hàng trăm khách hàng tăng trưởng fanpage vượt bậc. Kết hợp dịch vụ tăng like, comment và share từ LikeSub với content chất lượng, bạn sẽ thấy sự thay đổi đáng kinh ngạc chỉ sau 1 tháng...",
        category: "Hướng dẫn",
        createdAt: "1 ngày trước",
        likes: 512,
        comments: 89,
        isLiked: true,
        badge: "trending",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    },
    {
        id: "3",
        author: {
            name: "Success Story",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Success",
            role: "Customer",
        },
        title: "Case Study: Shop thời trang tăng 15.000 follow Instagram trong 2 tuần",
        description:
            "Câu chuyện thành công của shop @fashionvn khi sử dụng combo dịch vụ Instagram của LikeSub. Từ 3K followers lên 18K followers, đơn hàng tăng 300%, doanh thu tăng vọt. Bí quyết nằm ở việc kết hợp tăng follow + like bài viết + view story đều đặn mỗi ngày...",
        category: "Case Study",
        createdAt: "3 ngày trước",
        likes: 428,
        comments: 67,
        isLiked: false,
        badge: "trending",
    },
    {
        id: "4",
        author: {
            name: "LikeSub System",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=System",
            role: "System",
        },
        title: "⚡ Giảm giá 30% toàn bộ dịch vụ YouTube - Chỉ 3 ngày duy nhất!",
        description:
            "Chương trình khuyến mãi đặc biệt: Giảm 30% cho tất cả dịch vụ YouTube (Subscribe, View, Like). Áp dụng từ 20/01 đến 23/01/2026. Đây là cơ hội tuyệt vời để phát triển kênh YouTube của bạn với chi phí thấp nhất. Số lượng có hạn, nhanh tay đặt hàng ngay!",
        category: "Khuyến mãi",
        createdAt: "5 giờ trước",
        likes: 892,
        comments: 156,
        isLiked: false,
        badge: "new",
        image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80",
    },
    {
        id: "5",
        author: {
            name: "Product Team",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Product",
            role: "Product Manager",
        },
        title: "Cập nhật: Thêm dịch vụ tăng view Threads & Like Shopee",
        description:
            "Đáp ứng nhu cầu của cộng đồng, chúng tôi chính thức ra mắt 2 dịch vụ mới: Tăng view & like cho Threads (nền tảng mới của Meta) và tăng like sản phẩm Shopee. Giá cực ưu đãi trong tuần đầu ra mắt. Hỗ trợ seller tăng uy tín shop và đẩy sản phẩm lên top...",
        category: "Cập nhật",
        createdAt: "1 tuần trước",
        likes: 367,
        comments: 45,
        isLiked: false,
        badge: "new",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    },
    {
        id: "6",
        author: {
            name: "Community Manager",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Community",
            role: "Community",
        },
        title: "🎊 Cộng đồng LikeSub chính thức đạt 100.000 thành viên!",
        description:
            "Cảm ơn sự tin tưởng và đồng hành của 100.000+ khách hàng đã sử dụng dịch vụ của LikeSub. Để tri ân, chúng tôi tặng 50.000đ vào tài khoản cho 1000 khách hàng may mắn. Đã xử lý hơn 5 triệu đơn hàng với tỷ lệ hoàn thành 99.8%. Cảm ơn các bạn rất nhiều!",
        category: "Cộng đồng",
        createdAt: "2 tuần trước",
        likes: 1247,
        comments: 203,
        isLiked: false,
        badge: "trending",
    },
];

const INITIAL_COUNT = 3;

export default function HomeNewsFeed() {
    const ALL_POSTS: BlogPost[] = MOCK_BLOG_POSTS;

    const [posts, setPosts] = useState<BlogPost[]>(MOCK_BLOG_POSTS);
    const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

    const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);

    const visiblePosts = posts.slice(0, visibleCount);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoadingPosts(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleLike = (postId: string) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.id === postId
                    ? {
                        ...post,
                        isLiked: !post.isLiked,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                    }
                    : post
            )
        );
    };

    const getBadgeStyle = (badge?: "trending" | "new") => {
        if (badge === "trending") {
            return "bg-gray-900 text-white";
        }
        if (badge === "new") {
            return "bg-gray-200 text-gray-900";
        }

        return "";
    };

    const handleLoadMore = () => {
        setIsLoadingLoadMore(true);

        setTimeout(() => {
            setVisibleCount((prev) => prev + 4);
            setIsLoadingLoadMore(false);
        }, 800);
    };

    return (
        <div className="bg-white rounded shadow-sm border border-gray-200">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            Tin tức & Cập nhật
                        </h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Các thông tin mới nhất từ hệ thống
                        </p>
                    </div>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="divide-y divide-gray-200">
                {isLoadingPosts ? (
                    <div className="flex items-center justify-center py-20">
                        <LoaderCircle className="w-10 h-10 text-slate-800 animate-spin" />
                    </div>
                ) : (
                    visiblePosts.map((post) => (
                        <div
                            key={post.id}
                            className="p-6 hover:bg-gray-50/50 transition-all duration-200 group"
                        >
                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-4">
                                <img
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-gray-900">
                                            {post.author.name}
                                        </span>
                                        <span className="text-xs text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">
                                            {post.author.role}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-xs text-gray-500">
                                            {post.createdAt}
                                        </span>
                                        {post.badge && (
                                            <>
                                                <span className="text-xs text-gray-400">•</span>
                                                <span
                                                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${getBadgeStyle(
                                                        post.badge
                                                    )}`}
                                                >
                                                    {post.badge === "trending" && (
                                                        <TrendingUp className="w-3 h-3" />
                                                    )}
                                                    {post.badge === "trending" ? "Trending" : "Mới"}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-gray-600 bg-gray-200 px-3 py-1 rounded-full">
                                    {post.category}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="mb-4">
                                <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors cursor-pointer">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {post.description}
                                </p>
                                {post.image && (
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-64 object-cover rounded-lg mt-3 cursor-pointer hover:opacity-95 transition-opacity"
                                    />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => handleLike(post.id)}
                                    className={`flex items-center gap-2 text-sm font-medium transition-all cursor-pointer ${post.isLiked
                                        ? "text-gray-900"
                                        : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    <Heart
                                        className={`w-4 h-4 transition-all ${post.isLiked ? "fill-gray-900" : ""
                                            }`}
                                    />
                                    <span>{post.likes}</span>
                                </button>

                                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors cursor-pointer">
                                    <MessageCircle className="w-4 h-4" />
                                    <span>{post.comments}</span>
                                </button>

                                <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors ml-auto cursor-pointer">
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-xs">Chia sẻ</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {!isLoadingPosts && visibleCount < ALL_POSTS.length && (
                <div className="p-4 border-t border-gray-200 text-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoadingLoadMore}
                        className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoadingLoadMore ? (
                            <>
                                <LoaderCircle className="w-5 h-5 text-slate-800 animate-spin" />
                                Đang tải...
                            </>
                        ) : (
                            "Tải thêm bài viết"
                        )}
                    </button>
                </div>
            )}
        </div>
    );
}