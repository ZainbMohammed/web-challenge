import React, { useState } from 'react'
import Navbar from '../../components/Navbar/navbar';
import PasswordInput from '../../components/Input/passwordInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passsword, setPassword] = useState("");
    const [error, setError] = useState(null);


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

    }
    return <>
        <Navbar />

        <div className='flex items-center justify-center mt-28'>
            <div className='w-96 border rounded-3xl shadow-2xl bg-white px-7 py-10'>
                <form onSubmit={signupHandler}>
                    <h4 className='text-2xl mb-7 text-center'>إنشاء حساب</h4>

                    <input
                        type='text'
                        placeholder='اسم المستخدم'
                        className='input-box'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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

                    <button type='submit' className='btn-primary'>إنشاء حساب</button>

                    <p className='text-sm text-center mt-4'>لديك حساب بالفعل؟{' '}
                        <Link to='/login' className='font-medium text-primary underline'>تسجيل الدخول</Link>
                    </p>
                </form>
            </div>
        </div>
    </>

};
export default Signup