import { getActiveServices } from "../../services/operations/serviceDetailsAPI";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';

// import "swiper/swiper-bundle.min.css"; // Import Swiper styles
// import SwiperCore, { Autoplay, FreeMode, Pagination } from "swiper"; // Import Swiper core and required modules
// SwiperCore.use([Autoplay, FreeMode, Pagination]);
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useServices } from "../../queries/useServices";
function ServicesSlider() {


    const [services, setServices] = useState([]);
    const { data, isLoading, isStale, refetch } = useServices();

    const truncateWords = 15;
    const filterKey = "service"
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log('data', data);
    }, [data])

    useEffect(() => {
        (async () => {
            const response = await getActiveServices();
            console.log("active services data : ", response);
            console.log("response: ", response);
            if (response != null) {
                setServices(response);
            }
            console.log("services : ", services);
        })();
    }, []);

    const handleChange = (option) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set(filterKey, option);
        navigate(`/find-job?${queryParams.toString()}`);

    };


    return (
        <div className='flex justify-center items-center px-4'>
            {
                services?.length !== 0 ? (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        loop={true}
                        freeMode={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        // pagination={{
                        // clickable: true,
                        // }}
                        // navigation={true}
                        modules={[Autoplay]}
                        className="mySwiper w-10/12 border"
                    // autoplay={{
                    //     delay: 2500,
                    //     disableOnInteraction: false,
                    // }}
                    // modules={[FreeMode, Pagination, Autoplay]}
                    >
                        {data?.map((service) => (
                            <SwiperSlide key={service._id}>
                                <div
                                    onClick={() => handleChange(service._id)}
                                    className="flex justify-between items-center w-full h-[201px] bg-purple-700 hover:cursor-grab"
                                >
                                    <div className="flex flex-1 flex-col justify-center items-center lg:gap-y-1">
                                        <h2 className="font-semibold text-richblack-5 sm:text-[14px] lg:text-[30px] text-center leading-tight ">{service.serviceName}</h2>
                                        {/* <h2 className="text-[12px] sm:text-[16px] lg:text-[30px] font-medium text-black">
                                            {service?.serviceName}
                                        </h2> */}
                                        <p className="font-medium text-richblack-25 leading-relaxed sm:text-[11px] lg:text-[20px] lg:text-center">
                                            {service?.serviceDescription.split(" ").length > truncateWords
                                                ? service?.serviceDescription
                                                    .split(" ")
                                                    .slice(0, truncateWords)
                                                    .join(" ") + "..."
                                                : service?.serviceDescription}
                                        </p>
                                    </div>
                                    <div className=" w-5/12 h-full ">
                                        <img
                                            src={service?.icon}
                                            alt={service?.serviceName}
                                            className="w-full h-full object-cover "
                                        />
                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}



                    </Swiper>
                ) : (
                    <p>No Services Found</p>
                )
            }

            {/* </div> */}
        </div>
    );
}

export default ServicesSlider;
