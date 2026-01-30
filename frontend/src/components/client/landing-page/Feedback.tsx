"use client"

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

export default function Feedback() {
  const feedbacks = [
    {
      name: "Nguyễn Văn A",
      role: "Chủ shop online",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
      text: "Dịch vụ tuyệt vời! Tương tác tăng nhanh chóng, giúp shop mình có nhiều đơn hàng hơn. Giá cả hợp lý, hỗ trợ nhiệt tình.",
    },
    {
      name: "Trần Thị B",
      role: "Content Creator",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      text: "Mình đã sử dụng Likesub được 3 tháng, kênh YouTube tăng trưởng vượt bậc. View và sub tăng đều đặn, rất tự nhiên.",
    },
    {
      name: "Lê Minh C",
      role: "Influencer",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
      text: "Dịch vụ uy tín, giao dịch nhanh chóng. Trang Facebook của mình đã tăng từ 5k lên 50k follower chỉ trong 2 tháng.",
    },
    {
      name: "Phạm Thu D",
      role: "Marketer",
      avatar: "https://randomuser.me/api/portraits/women/13.jpg",
      text: "Hệ thống dễ sử dụng, đa dạng dịch vụ. Đặc biệt là tính năng Drip-feed giúp tăng tương tác rất tự nhiên.",
    },
    {
      name: "Hoàng Văn E",
      role: "Chủ doanh nghiệp",
      avatar: "https://randomuser.me/api/portraits/men/13.jpg",
      text: "Giá cả cạnh tranh, chất lượng tốt. Team support nhiệt tình, giải đáp thắc mắc nhanh chóng. Rất hài lòng!",
    },
    {
      name: "Võ Thị F",
      role: "Blogger",
      avatar: "https://randomuser.me/api/portraits/women/14.jpg",
      text: "Likesub giúp mình tiết kiệm rất nhiều thời gian và công sức. Tương tác tăng đều, giúp bài viết lên top dễ dàng.",
    },
  ];

  return (
    <section className="pt-18 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-semibold text-center text-gray-700 mb-6">
          Khách hàng nói gì về
          <br />
          Likesub?
        </h2>
        <p className="text-center text-sm text-gray-600 mb-14 max-w-2xl mx-auto">
          Hàng nghìn khách hàng đã tin tưởng và sử dụng dịch vụ của chúng tôi.
          Đọc những đánh giá chân thực từ khách hàng để hiểu rõ hơn về chất lượng
          dịch vụ mà Likesub mang lại.
        </p>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={32}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="pb-10!"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((fb, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex flex-col items-center text-center min-w-75">
                <Image
                  src={fb.avatar}
                  alt={fb.name}
                  className="w-16 h-16 rounded-full object-cover mb-4 shadow"
                  width={16}
                  height={16}
                />
                <div className="flex gap-1 mb-7">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} color="#FFD600" fill="#FFD600" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-sm max-w-xs">{fb.text}</p>
                <div className="font-semibold text-lg text-gray-700">
                  {fb.name}
                </div>
                <div className="text-gray-500 text-xs">{fb.role}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
