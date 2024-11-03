import { login } from '@/store/slices/userSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('email', email);
    formData.append('password', password);

    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo('/');
    }
  }, [isAuthenticated, dispatch, loading, navigateTo]);

  return (
    <div>
      <section className='w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center'>
        <div className='bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]'>
          <h1
            className={`text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}
          >
            Login
          </h1>

          <form className='flex flex-col gap-5 w-full' onSubmit={handleLogin}>
            <div className='flex flex-col gap-2'>
              <label className='text-[16px] text-stone-600'>Email</label>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-[16px] text-stone-600'>Password</label>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'
              />
            </div>

            <button
              className={`bg-[#d6482b]  text-white my-4 font-semibold hover:bg-[#b8381e] transition-all duration-150 text-xl py-2 px-4 rounded-sm w-[280px] lg:w-[640px] mx-auto ${
                loading ? 'cursor-not-allowed' : ''
              }`}
              type='submit'
              disabled={loading}
            >
              {loading ? 'Logging In..' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
