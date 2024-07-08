import React, { useState } from 'react'
// import Navbar from '../../components/Navbar/navbar';
import PasswordInput from '../../components/Input/passwordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import Logo from '../../assets/loogo.png'
import axiosInstance from '../../utils/axiosInstance';
// import {useNavigate} from 'react-router-dom';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const signupHandler = async (e) => {
        e.preventDefault();

        if (!name) {
            setError('ادخل اسمك ');
            return;
        }
        if (!validateEmail(email)) {
            setError('ادخل الايميل بشكل صحيح');
            return;
        }
        if (!passsword) {
            setError('ادخل كلمة المرور');
            return;
        }

        // otherwise (if every thing was well)
        setError('');

        // signup api call
        try {

            // Handle successful sigunup
            const response = await axiosInstance.post('/users/register', {
                fullName: name,
                email: email,
                password: passsword
            });

            if (response.data && response.data.error) {
                setError(response.data.message);
                return;
            }
            if (response.data && response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/home');
            }
        } catch (error) {

            // Handle failed signup
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('هناك مشكبة حدثت, حاول مجدداً من فضلك');
            }

        }

    }
    return <>
        <div className='flex items-center justify-center mt-3'>
            <div className='w-96 border rounded-3xl shadow-2xl bg-white px-7'>
                <div className='flex justify-center items-center'>
                    <img className='w-48' src={Logo}></img>
                </div>
                <form onSubmit={signupHandler}>
                    <h4 className='text-2xl mb-6 text-center'>إنشاء حساب</h4>

                    <input
                        type='text'
                        placeholder='اسم المستخدم'
                        className='input-box px-3 shadow-inner'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type='text'
                        placeholder='الإيميل'
                        className='input-box shadow-inner px-3'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <PasswordInput
                        value={passsword}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className='text-red-500 text-xs pb-1'> {error}</p>}

                    <button type='submit' className='btn-primary'>إنشاء حساب</button>

                    <p className='text-sm text-center mt-2 mb-4'>لديك حساب بالفعل؟{' '}
                        <Link to='/login' className='font-medium text-primary underline'>تسجيل الدخول</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
};
export default Signup