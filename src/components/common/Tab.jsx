import React from "react";
// import NavBar from "../../Pages/NavBar";
// import Footer from "../../Pages/Footer/Footer";
// import email_icon from '../../Assests/Icons/email_icon.png';
// import password_icon from '../../Assests/Icons/password_icon.png';
// import user_icon from '../../Assests/Icons/user_icon.png';

export default function Tab({ tabData, field, setField }) {
  return (
      <div
        style={{
          boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
        }}
        className="min-w-[max-content] flex bg-purple-500 p-1 
             lg:my-6 sm:my-4 rounded-full max-w-max "
      >
        {tabData.map((tab) => (
          <button
          type="button"
            key={tab.id}
            onClick={() => setField(tab.type)}
            className={` ${
              field === tab.type
                ? "bg-purple-700 text-richblack-5"
                : "bg-transparent text-black"
            } lg:py-2 lg:px-5 sm:py-1 sm:px-3 rounded-full transition-all duration-200`}
          >
            {tab?.tabName}
          </button>
        ))}
        {/* <div>
          <div className="container-tab">
            <div className="header">
              <div className="text"> Sign Up</div>
              <div className="underline"></div>
              <div className="inputs">
                <div className="input">
                    <img src={email_icon}alt="" />
                    <input type="text"  placeholder="Name"/>
                </div>
                <div className="input">
                    <img src={user_icon} alt="" />
                    <input type="email"  placeholder="Email Id"/>
                </div>
                <div className="input">
                    <img src={password_icon} alt="" />
                    <input type="password"  placeholder="password"/>
                </div>
              </div>
              <div className="forgot-password">Lost Password <span>Click here</span></div>
              <div className="submit-container">
                <div className="submit">Sign Up</div>
                <div className="submit">Login</div>
              </div>
            </div>
          </div>
        </div> */}
         
      {/* <div>
        <Footer />
      </div> */}
      </div>

  );
}
