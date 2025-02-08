import React, { useEffect, useState , useRef } from 'react';
import { getRecentlyPublishedJobs } from '../../../services/operations/jobPostAPI';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Scrollbar } from 'swiper/modules';

const RecentlyPublishedSlider = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch recently published jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await getRecentlyPublishedJobs();
        console.log("RECENTLY PUBLISHED JOBS SLIDER :",response);
        setJobs(response);
      } catch (error) {
        console.error('Error fetching recently published jobs in slider:', error.message);
      }
    };
    fetchJobs();
  }, []);
  const TRUNCATE_LENGTH = 8


  return (
<div className='mt-20 flex flex-col gap-3 w-full justify-center items-center mx-auto'>
            <h2>Recently Published Jobs</h2>
    {
        jobs?.length !== 0 ? (
            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            
            scrollbar={{
            hide: true,
            }}
            // freeMode={true}
            // autoplay={{
            // delay: 2200,
            // disableOnInteraction: false,
            // }}
            
            // navigation={true}
            modules={[Scrollbar]}
            className="mySwiper w-[100%] p-3 flex bg-richblack-100 gap-8 justify-center items-center "
            
            // modules={[FreeMode, Pagination, Autoplay]}
            >

            {jobs?.map((job) => (
                <SwiperSlide key={job._id}>
            <div>
                <Link to={`/job/${job._id}`} key={job._id} 
                className="p-3 flex flex-col gap-2  justify-center items-center border-1 border-white text-white font-bold mx-auto">
                
              <img
                alt={job.companyName}
                className="h-[125px] w-[100px] rounded-lg object-cover"
                src={job?.companyImage}
              />

              <div className=' w-full flex flex-col justify-center items-center gap-[1px]'>
                <h3>{job.jobTitle}</h3>
                <p>{
                job.jobDescription.split(" ").length >
                          TRUNCATE_LENGTH
                            ? job.jobDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : job.jobDescription}</p>
                <p>Number Of Vacancies :{job.numberOfVacancy}</p>
                <p> Job Location : {job.jobLocation}</p>
              </div>
          </Link>
            </div>
              {/* Render other job details here */}
                </SwiperSlide>
            ))}



            </Swiper>
        ) : (
            <p>No Recently Published Jobs Found</p>
        )
    }
</div>
    );
};

export default RecentlyPublishedSlider;