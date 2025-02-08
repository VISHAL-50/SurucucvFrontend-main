import React from 'react';


const SidebarForJobs = ({ setSelectedJobType, selectedJobType }) => {
    const sidebarStyle = {
        
        padding: '12px',
        
        overflowY: 'auto'
  };

  const linkStyle = {
      
      margin: '10px 0',
      cursor: 'pointer',
      


      
    };
    

  return (
    <div className='bg-white m-2 rounded-lg w-[500px] h-56' style={sidebarStyle}>
    
      <div onClick={() => setSelectedJobType('full-time-jobs')} style={linkStyle} 
      
      className={`text-black border-b border-pure-greys-100 
      px-2
      ${ selectedJobType === "full-time-jobs" ? "opacity-100 border-l-2 border-l-orange-400 " : ""} `} 
      >
      
      {/* <span
        className={`absolute left-0 top-0 h- w-[0.15rem] bg-orange-400 ${
          selectedJobType === "full-time-jobs" ? "opacity-100" : "opacity-0"
        }`}
      ></span> */}


      Full Time Jobs</div>

      <div onClick={() => setSelectedJobType('part-time-jobs')} style={linkStyle} 
      className={`text-black border-b border-pure-greys-100 
      px-2
      ${ selectedJobType === "part-time-jobs" ? "opacity-100 border-l-2 border-l-orange-400 " : ""} `} 
      >Part Time Jobs</div>

      <div onClick={() => setSelectedJobType('recently-published-jobs')} style={linkStyle} 
      className={`text-black border-b border-pure-greys-100 
      px-2
      ${ selectedJobType === "recently-published-jobs" ? "opacity-100 border-l-2 border-l-orange-400 " : ""} `} 
      
      >Recently Published Jobs</div>

      <div onClick={() => setSelectedJobType('international-jobs')} style={linkStyle} 
      className={`text-black border-b border-pure-greys-100 
      px-2
      ${ selectedJobType === "international-jobs" ? "opacity-100 border-l-2 border-l-orange-400 " : ""} `} 
      
      >International Jobs</div>
      {/* Add more links here for other job groups */}
    </div>
  );
};

export default SidebarForJobs;
