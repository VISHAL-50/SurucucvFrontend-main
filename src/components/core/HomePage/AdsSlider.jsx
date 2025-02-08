import { getActiveAds } from "../../../services/operations/adsAPI";
import { fetchCompanyById } from "../../../services/operations/profileAPI"; // Import function to get company name
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

function AdsSlider() {
    const [ads, setAds] = useState([]);
    const [companyNames, setCompanyNames] = useState({});
    const truncateWords = 15;
    const navigate = useNavigate();
    const location = useLocation();
    const [companies, setCompanies] = useState({});
    useEffect(() => {
        const fetchAds = async () => {
            const response = await getActiveAds();
            if (response) {
                setAds(response);
            }
        };
        fetchAds();
    }, []);

    useEffect(() => {
        // Fetch each company's name for the ads
        const fetchCompanies = async () => {
          const companyData = {};
          for (const ad of ads) {
            if (ad.company && !companyData[ad.company]) {
              const response = await fetchCompanyById(ad.company); // Fetching company details
              if (response.success) {
                companyData[ad.company] = response.data.companyTitle;
              }
            }
          }
          setCompanies(companyData);
        };
        fetchCompanies();
      }, [ads]);

    const handleChange = (adId) => {
        navigate(`/ad-details/${adId}`);
    };

    return (
        <>
            {ads.length !== 0 ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {ads.map((ad) => (
                        <SwiperSlide key={ad._id}>
                            <div
                                className="flex flex-col gap-3 sm:w-[90%] lg:w-full h-60 mt-20 mx-auto hover:border-orange-400 bg-pure-greys-50 hover:cursor-grab p-3 rounded-lg border-1 border-richblack-50"
                                onClick={() => handleChange(ad._id)}
                            >
                            <div className=" md:min-w-[65%] sm:w-full w-[700px] lg:h-full sm:flex-row lg:flex justify-evenly items-center gap-4 sm:space-y-2 ">
                                    <img
                                        src={ad?.icon}
                                        alt={ad?.title}
                                        className="md:h-[148px] md:w-[220px] sm:w-[7rem] sm:h-[3rem] lg:w-[180px] lg:h-[120px] object-fill rounded-lg"
                                    />
                                <div className="lg:w-full flex flex-col justify-center items-center lg:gap-y-1">
                                    <h2 className="font-semibold text-richblack-5 sm:text-[14px] lg:text-[30px] text-center leading-tight">
                                        {ad.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {companyNames[ad.company] || "Loading..."}
                                    </p>
                                    <p className="font-medium text-richblack-25 leading-relaxed sm:text-[11px] lg:text-[20px] lg:text-center">
                                        {ad.description.split(" ").length > truncateWords
                                            ? ad.description.split(" ").slice(0, truncateWords).join(" ") + "..."
                                            : ad.description}
                                    </p>
                                </div>
                                {/* 6715607eec4c8d00dce8f9fd */}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>No Advertisements Found</p>
            )}
        </>
    );
}

export default AdsSlider;
