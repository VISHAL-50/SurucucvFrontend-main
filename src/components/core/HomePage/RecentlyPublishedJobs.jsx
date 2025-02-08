import React, { useEffect, useState } from 'react';
import { getRecentlyPublishedJobs } from '../../../services/operations/jobPostAPI';
import { Link } from 'react-router-dom';

const RecentlyPublishedJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch recently published jobs from the backend
    const fetchJobs = async () => {
      try {
        const response = await getRecentlyPublishedJobs();
        console.log("RECENTLY PUBLISHED JOBS :",response);
        setJobs(response);
      } catch (error) {
        console.error('Error fetching recently published jobs:', error.message);
      }
    };
    fetchJobs();
  }, []);

  const TRUNCATE_LENGTH = 4

  return (
    <div className="lg:w-full  shadow-lg  p-3 bg-white rounded-lg">
    <div className='flex justify-between p-2'>
      <h4 className='leading-4'>RECENTLY PUBLISHED JOBS</h4>
      <Link to="/find-job" className='text-orange-400 font-semibold hover:text-orange-400'>All Jobs</Link>
    </div>
      <div className="jobs-grid  rounded-lg p-1 ">
        {jobs.map((job) => (
          <Link to={`/job/${job._id}`} key={job._id} className="job-card  ">
            <div className='flex gap-2 shadow-sm p-1 shadow-pure-greys-500  h-[130px] '>
                
              <img
                alt={job.companyName}
                className="h-[78px] w-[78px] rounded-lg object-cover"
                src={job?.companyImage}
              />

              <div className='flex w-full h-full flex-col space-y-1 p-1'>
              <div className='space-y-1 w-full'>

                <h5 className='text-black'>{job.jobTitle}</h5>
                <p className='text-[16px] '>{
                job.jobDescription.split(" ").length >
                          TRUNCATE_LENGTH
                            ? job.jobDescription
                                .split(" ")
                                .slice(0, TRUNCATE_LENGTH)
                                .join(" ") + "..."
                            : job.jobDescription}</p>
              </div>
                <div className='flex justify-evenly gap-8 w-[100%]'>
                  <p className='text-[14px]   '>Vacancies :{job.numberOfVacancy}</p>
                  <p className='text-[14px] ' >{job.jobLocation}</p>
                </div>
              </div>
            </div>
              {/* Render other job details here */}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyPublishedJobs;
