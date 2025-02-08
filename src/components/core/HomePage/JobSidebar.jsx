import React, { useEffect, useState } from 'react';
import SidebarForJobs from './SidebarForJobs';
import FullTimeJobs from './FullTimeJobs';
import PartTimeJobs from './PartTimeJobs';
import RecentlyPublishedJobs from './RecentlyPublishedJobs';
import InternationalJobs from './InternationalJobs';
import {
  getFullTimeJobs,
  getInternationalJobs,
  getPartTimeJobs,
  getRecentlyPublishedJobs
} from '../../../services/operations/jobPostAPI';


const jobCategoryData = [
  { name: 'Full Time Jobs', slug: 'FullTimeJobs', active: true, fn: getFullTimeJobs, data: [] },
  { name: 'Part Time Jobs', slug: 'PartTimeJobs', active: false, fn: getPartTimeJobs, data: [] },
  { name: 'Recently Published Jobs', slug: 'RecentlyPublishedJobs', active: false, fn: getRecentlyPublishedJobs, data: [] },
  { name: 'International Jobs', slug: 'InternationalJobs', active: false, fn: getInternationalJobs, data: [] },
];

const JobCard = ({ data, name }) => {

  return (
    <div className="flex flex-col  w-full mt-4 lg:hidden">
      <h1 className="text-2xl text-center font-semibold mt-2">{name}</h1>
      <div className="flex lg:flex-1 w-full flex-col lg:h-[450px] h-auto lg:ml-8 ml-0 py-2 lg:px-4 bg-white mt-4">
        <div className="w-full flex justify-end items-center py-2 px-4">
          <button className="text-lg text-purple-700 font-rubik-semibold">All jobs</button>
        </div>
        <div className="w-auto grid gap-4 py-4 ">
          {data.length !== 0 ? (
            data.map((data, index) => {
              return (
                <div key={index} className='flex flex-1 px-6 py-0.5 gap-x-2.5 justify-start items-start bg-white  border-purple-700 cursor-pointer'>
                  <div className='flex-1 flex flex-col justify-start items-start py-1 '>
                    <div className='w-full flex justify-between items-start'>
                      <div className='hidden w-[100px] h-[100px] sm:flex flex-col gap-y-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg'>
                        <img
                          src={data?.companyImage}
                          className='w-full h-full rounded-lg   object-cover'
                        />
                      </div>
                      <div className='flex flex-col justify-start items-start'>
                        <span className='text-lg font-rubik-semibold truncate'>{data.jobTitle}</span>
                        <span className='text-sm mt-1 font-rubik-semibold truncate '>{data.companyName}</span>
                        <span className='text-[12px] mt-2 font-rubik-light text-[#808080]  truncate'>{data?.jobDescription}</span>
                      </div>
                    </div>
                    <div className='w-full flex justify-between items-center mt-4 '>
                      <div className='flex gap-x-1.5 '>
                        <span className='bg-[#f5f5f5] px-2 py-1 rounded-lg text-[12px] font-normal'>
                          Vacancies: {data?.numberOfVacancy}
                        </span>
                        <div className='bg-black h-full w-[1px]' />
                        <span className='bg-[#f5f5f5]  px-2 py-1 rounded-lg text-[12px] font-normal'>
                          Location: {data?.jobLocation}
                        </span>
                      </div>
                      <span

                        className='text-sm w-[70px] font-rubik-semibold truncate text-purple-700  rounded-lg '>
                        {data?.jobType}
                      </span>
                    </div>
                  </div>
                </div >
              );
            })
          ) : (
            <p className="text-center text-gray-500">No job data available</p>
          )}
        </div>
      </div>
    </div>
  )
};

const JobSidebar = () => {


  const [jobCategory, setJobCategory] = useState(jobCategoryData);


  useEffect(() => {

    const fetchDataAndSetData = async () => {
      try {
        const updatedJobCategoryData = await Promise.all(
          jobCategoryData.map(async (category) => {
            const res = await category.fn(); // Call the function to fetch data
            return { ...category, data: res }; // Return updated category with data
          })
        );

        setJobCategory(updatedJobCategoryData);
      } catch (error) {
        console.error("Error fetching job category data:", error);
      }
    };

    fetchDataAndSetData();

  }, []);


  const updateActiveCategory = async (selectedSlug, fn) => {
    setJobCategory((prevCategories) =>
      prevCategories.map((category) => ({
        ...category,
        active: category.slug === selectedSlug,
      }))
    )
  }

  return (
    <div className='w-full flex flex-col py-8 px-2'>
      <div className="lg:flex flex-row  w-full hidden">
        <div className='jobCategory gap-x-1 lg:gap-y-2.5 items-start'>
          {jobCategory.map((category) => (
            <button
              key={category.slug}
              onClick={() => {
                updateActiveCategory(category.slug);
                fetchSelectedCategoryData(category.fn);
              }}
              className={`flex jobCategoryButton  truncate text-ellipsis overflow-hidden font-rubik-semibold bg-white px-1 lg:px-3.5 py-2 hover:bg-purple-700 rounded-lg rounded-s-none  justify-start items-center 
                         border-purple-700 ${category.active ? 'border-l-4 ' : 'hover:border-l-2 hover:shadow-[0_0_5px_rgba(0,0,0,0.1)]'}
                        `}
            >
              {category.name}
            </button>
          ))}
        </div>
        <div className='flex lg:flex-1 w-full flex-col lg:h-[450px] h-auto lg:ml-8 ml-0 py-2 lg:px-4 bg-white'>
          <div className='w-full flex justify-end items-center py-2 px-4'>
            <button className='text-lg text-purple-700 font-rubik-semibold'>
              All jobs
            </button>
          </div>
          <div className='w-full flex  h-[450px]'>
            {jobCategory.map((category) => {
              if (category.active === false) return;
              return (
                <div key={category.slug} className='w-full grid grid-cols-3 grid-rows-2 gap-y-4'>
                  {category.data.map((data, index) => (
                    <div key={index} className='flex flex-1 px-2 py-0.5 gap-x-2.5 justify-start items-start bg-white  border-purple-700 cursor-pointer'>
                      <div className='flex-1 flex flex-col justify-start items-start py-1 '>
                        <div className='w-full flex justify-between items-start'>
                          <div className='flex flex-col justify-start items-start'>
                            <span className='text-lg font-rubik-semibold truncate'>{data.jobTitle}</span>
                            <span className='text-sm mt-1 font-rubik-semibold truncate '>{data.companyName}</span>
                            <span className='text-[12px] mt-2 font-rubik-light text-[#808080]  truncate'>{data?.jobDescription}</span>
                          </div>
                          <div className='w-[50px] h-[50px] flex flex-col gap-y-2 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-lg'>
                            <img
                              src={data?.companyImage}
                              className='w-full h-full rounded-lg   object-cover'
                            />
                          </div>
                        </div>
                        <div className='w-full flex justify-between items-center mt-2 '>
                          <div className='flex gap-x-1.5 '>
                            <span className='bg-[#f5f5f5] px-2 py-1 rounded-lg text-[12px] font-normal'>
                              Vacancies: {data?.numberOfVacancy}
                            </span>
                            <div className='bg-black h-full w-[1px]' />
                            <span className='bg-[#f5f5f5]  px-2 py-1 rounded-lg text-[12px] font-normal'>
                              Location: {data?.jobLocation}
                            </span>
                          </div>
                          <span

                            className='text-sm w-[70px] font-rubik-semibold truncate text-purple-700  rounded-lg '>
                            {data?.jobType}
                          </span>
                        </div>
                      </div>
                    </div >
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <JobCard
        data={jobCategory[0].data}
        name={jobCategory[0].name}
      />
      <JobCard
        data={jobCategory[1].data}
        name={jobCategory[1].name}
      />
      <JobCard
        data={jobCategory[2].data}
        name={jobCategory[2].name}
      />
      <JobCard
        data={jobCategory[3].data}
        name={jobCategory[3].name}
      />
    </div>
  );
};

export default JobSidebar;
