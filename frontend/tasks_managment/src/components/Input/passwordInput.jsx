import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const PasswordInput = ({ value, onChange, placeholder }) => {

    // to know the case of FaRegEye icon
    const [isShowPassword, setIsShowPassword] = useState(false);

    // to switch between 2 cases of password eye icon
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword);
    }
    return <>
        <div className="flex items-center bg-transparent border-[1.5px] px-1 rounded mb-3 shadow-inner">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? "text" : "password"}
                placeholder={placeholder || "كلمة المرور"}
                className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
            />
            {/* handle icons of cases */}
            {isShowPassword ? (
                <FaRegEye
                    size={22}
                    className="text-primary cursor-pointer "
                    onClick={() => toggleShowPassword()}
                />
            ) : (
                <FaRegEyeSlash
                    size={22}
                    className="text-primary cursor-pointer"
                    onClick={() => toggleShowPassword()}
                />
            )}
        </div>
    </>
}

export default PasswordInput