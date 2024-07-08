import React, { useState } from 'react';
// import Navbar from '../../components/Navbar/navbar';
import {Link,useNavigate} from 'react-router-dom';
import PasswordInput from '../../components/Input/passwordInput';
import { validateEmail } from '../../utils/helper';

import axiosInstance from '../../utils/axiosInstance'
import Logo from '../../assets/loogo.png'

const Login = () => {

    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");
    const [error, setError] = useState(null);


const navigate = useNavigate();

    const loginHandler = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)){
            setError('ادخل الايميل بشكل صحيح');
            return;
        }
        // if email is valid
        setError('');

        // if the user not enter the password
        if (!passsword){
            setError('ادخل كلمة المرور');
            return
        }

        // api call
        try{

            // Handle successful login
            const response = await axiosInstance.post('/users/login',{
                email: email,
                password: passsword
            });
            if(response.data && response.data.accessToken){
                localStorage.setItem('token',response.data.accessToken);
                navigate('/dashboard');
            }
        }catch(error){

            // Handle failed login
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message);
            }else {
                setError('هناك مشكبة حدثت, حاول مجدداً من فضلك');
            }

        }
    };   

  return <>

    <div className='flex items-center justify-center mt-10'>
        <div className='w-96 border rounded-3xl shadow-2xl bg-white px-7'>
            <div className='flex justify-center items-center'>
            <img className='w-48' src={Logo}></img>
            </div>
            <form onSubmit={loginHandler}>
                <h4 className='text-2xl mb-6 text-center'>تسجيل الدخول</h4>

                <input 
                    type='text' 
                    placeholder='الإيميل' 
                    className='input-box py-3 shadow-inner outline-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                />

                <PasswordInput 
                    value={passsword}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 text-xs pb-1'> {error}</p>}

                <button type='submit' className='btn-primary'>تسجيل الدخول</button>

                <p className='text-sm text-center mt-3 mb-8'>لا تملك حساب؟ {' '}
                    <Link to='/signup' className='font-medium text-primary underline'>إنشاء حساب</Link>
                </p>
                
            </form>
        </div>
    </div>
  
  </>
};

export default Login