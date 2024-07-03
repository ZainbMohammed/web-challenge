import React, { useState } from 'react';
import Navbar from '../../components/Navbar/navbar';
import {Link} from 'react-router-dom';
import PasswordInput from '../../components/Input/passwordInput';
import { validateEmail } from '../../utils/helper';
import Logo from '../../assets/loogo.png'

const Login = () => {

    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");
    const [error, setError] = useState(null);


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
    };   

  return <>
    {/* <Navbar /> */}

    <div className='flex items-center justify-center mt-20'>
        <div className='w-96 border rounded-3xl shadow-2xl bg-white px-7 py-10'>
            <div className='flex justify-center items-center mb-8'>
            <img className='w-28' src={Logo}></img>
            </div>
            <form onSubmit={loginHandler}>
                <h4 className='text-2xl mb-7 text-center'>تسجيل الدخول</h4>

                <input 
                    type='text' 
                    placeholder='الإيميل' 
                    className='input-box'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput 
                    value={passsword}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className='text-red-500 text-xs pb-1'> {error}</p>}

                <button type='submit' className='btn-primary'>تسجيل الدخول</button>

                <p className='text-sm text-center mt-2'>لا تملك حساب؟ {' '}
                    <Link to='/signup' className='font-medium text-primary underline'>إنشاء حساب</Link>
                </p>
                
            </form>
        </div>
    </div>
  
  </>
};

export default Login