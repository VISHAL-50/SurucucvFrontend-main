import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { setSignupData } from '../../../slices/authSlice';
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import { State } from 'country-state-city';
import { useForm } from "react-hook-form";

const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CANDIDATE);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        city: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { name, email, password, confirmPassword, contactNumber, city } = formData;
    const [countryCode, setCountryCode] = useState("+90");
    
    const { register, formState: { errors } } = useForm();

    const changeHandler = (event) => {
        setFormData(prevData => ({ ...prevData, [event.target.name]: event.target.value }));
    };

    const handlePhoneNumberChange = (event) => {
        let value = event.target.value.replace(/\D/g, '');
        value = value === "" ? "5" : value;
        const formattedValue = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1$2 $3 $4 $5');
        setFormData((prevData) => ({
            ...prevData,
            contactNumber: formattedValue,
        }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const signupData = { ...formData, accountType };
        dispatch(setSignupData(signupData));
        try {
            dispatch(sendOtp(formData.email, formData.contactNumber, accountType, navigate));
        } catch (error) {
            toast.error("Failed to send OTP");
        }
    };

    const tabData = [
        { id: 1, tabName: "Candidate", type: ACCOUNT_TYPE.CANDIDATE },
        { id: 2, tabName: "Company", type: ACCOUNT_TYPE.COMPANY },
    ];

    return (
        <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-6 space-y-4">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Create Your Account</h2>
                
                <form onSubmit={submitHandler} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={name}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={changeHandler}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex items-center space-x-2">
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            className="w-1/4 px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="+90">🇹🇷 +90</option>
                            <option value="+1">🇺🇸 +1</option>
                        </select>
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Phone Number"
                            value={contactNumber}
                            onChange={handlePhoneNumberChange}
                            maxLength={13}
                            required
                            className="w-3/4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={changeHandler}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>

                    <div className="relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={changeHandler}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <span 
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>

                    <select
                        name="city"
                        value={city}
                        onChange={changeHandler}
                        {...register("city", { required: true })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Choose a City</option>
                        {State.getStatesOfCountry("TR")?.map((state, index) => (
                            <option key={index} value={state?.name}>
                                {state?.name}
                            </option>
                        ))}
                    </select>
                    {errors.city && (
                        <span className="text-red-500 text-sm">Please select a city</span>
                    )}

                    <Tab 
                        tabData={tabData} 
                        field={accountType} 
                        setField={setAccountType} 
                    />

                    <button 
                        type="submit" 
                        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;