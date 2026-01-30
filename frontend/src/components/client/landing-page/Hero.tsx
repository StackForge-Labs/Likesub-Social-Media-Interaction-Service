"use client"

export default function Hero() {
  const socialMediaLogos = [
    {
      name: "Facebook",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/89/Facebook_Logo_%282019%29.svg"
    },
    {
      name: "Instagram",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/960px-Instagram_logo.svg.png"
    },
    {
      name: "YouTube",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
    },
    {
      name: "Twitter",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Twitter_logo.svg/1280px-Twitter_logo.svg.png"
    },
    {
      name: "TikTok",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg"
    },
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },
  ];

  return (
    <section className="pt-40 min-h-screen relative bg-white">
      <div className="flex flex-col text-center items-center max-w-7xl mx-auto px-6 gap-12">
        <div className="md:w-250 w-full">
          <div>
            <h1 className="text-5xl! font-extrabold text-gray-700 mb-6 leading-tight">
              <span className="block">
                Bùng Nổ <span className="text-indigo-600">Tương Tác</span><br />
                <span className="text-indigo-600">Nâng Tầm </span>
                Thương Hiệu
              </span>
            </h1>

            <p className="text-[16px] w-full md:w-160 text-gray-500 font-medium mb-8 leading-relaxed mx-auto">
              Hệ thống Seeding tự động: Tăng Like, Follow, View thần tốc.
              Tạo hiệu ứng đám đông, giúp bạn chốt đơn và xây dựng uy tín dễ dàng hơn.
            </p>

            {/* Social Media Logos Carousel */}
            <div className="relative w-full py-8 overflow-hidden">
              <style jsx>{`
                @keyframes scroll {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(calc(-192px * 6));
                  }
                }
                .animate-scroll {
                  animation: scroll 14s linear infinite;
                }
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>

              {/* Fade overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="flex gap-16 animate-scroll">
                {[...socialMediaLogos, ...socialMediaLogos, ...socialMediaLogos, ...socialMediaLogos].map((social, idx) => (
                  <div
                    key={idx}
                    className="shrink-0 h-16 w-32 flex items-center justify-center transition-transform hover:scale-110 duration-300"
                    title={social.name}
                  >
                    <img
                      src={social.logo}
                      alt={social.name}
                      className="h-12 w-32 object-contain transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Container */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-64 md:h-80"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#1e40af"
            fillOpacity="0.5"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="10s"
              repeatCount="indefinite"
              values="
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
          <path
            fill="#1e40af"
            fillOpacity="0.7"
            d="M0,192L48,186.7C96,181,192,171,288,170.7C384,171,480,181,576,170.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="
                M0,192L48,186.7C96,181,192,171,288,170.7C384,171,480,181,576,170.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,192L48,186.7C96,181,192,171,288,170.7C384,171,480,181,576,170.7C672,160,768,128,864,128C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
          <path
            fill="#1e40af"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          >
            <animate
              attributeName="d"
              dur="6s"
              repeatCount="indefinite"
              values="
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,256L48,240C96,224,192,192,288,186.7C384,181,480,203,576,208C672,213,768,203,864,202.7C960,203,1056,213,1152,213.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
                M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,213.3C960,203,1056,181,1152,170.7C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}