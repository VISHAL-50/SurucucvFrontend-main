import React, { useEffect, useState } from 'react'
import RecentlyPublishedJobs from '../RecentlyPublishedJobs'
import FullTimeJobsJobs from '../FullTimeJobs'
import PartTimeJobsJobs from '../PartTimeJobs'
import InternationalJobs from '../InternationalJobs'

const JobGroups = () => {

  const jobCategory = [
    {
      name: 'Full Time Jobs',
      slug: 'FullTimeJobs'
    },
    {
      name: 'Part Time Jobs',
      slug: 'PartTimeJobs'
    },
    {
      name: 'Recently Published Jobs',
      slug: 'RecentlyPublishedJobs'
    },
    {
      name: 'International Jobs',
      slug: 'InternationalJobs'
    }
  ]

  const [selectedJobCategory, setSelectedJobCategory] = useState({ 'FullTimeJob': true })

  const onSelectCategory = (category) => {
    setSelectedJobCategory((prev) => {
      return {
        ...prev,
        [category]: !prev[category]
      }
    })
  };

  useEffect(() => {
    console.log('catgory', selectedJobCategory)
  }, [selectedJobCategory])

  return (
    <div className='w-[100%] hidden m-2 md:flex flex-col justify-center items-center gap-4 p-4 mx-auto '>
      {jobCategory.map((category) => (
        <button
          key={category.slug}
          onClick={() => onSelectCategory(category.slug)}
          className='text-md font-rubik-semibold '
        >
          {category.name}
        </button>
      ))}

      {/* <RecentlyPublishedJobs/>
        <FullTimeJobsJobs/>
        <PartTimeJobsJobs/>
        <InternationalJobs/> */}
    </div>
  )
}

export default JobGroups

