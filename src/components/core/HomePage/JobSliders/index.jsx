import React from 'react'
import RecentlyPublishedSlider from '../RecentlyPublishedSlider'
import FullTimeJobsSlider from '../FullTimeJobsSlider'
import PartTimeJobsSlider from '../PartTimeJobsSlider'
const JobSliders = () => {
  return (
    <div className='w-screen m-2 flex flex-col justify-center items-center gap-4'>
        <RecentlyPublishedSlider/>
        <FullTimeJobsSlider/>
        <PartTimeJobsSlider/>
    </div>
  )
}

export default JobSliders

