import { useState } from 'react';
import { RiAuctionFill } from 'react-icons/ri';
import { MdLeaderboard, MdDashboard } from 'react-icons/md';
import { SiGooglesearchconsole } from 'react-icons/si';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { RiInstagramFill } from 'react-icons/ri';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdCloseCircleOutline, IoIosCreate } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { FaFileInvoiceDollar } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
// React redux
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/userSlice';
import { Link } from 'react-router-dom';

const SideDrawer = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout);
  };

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className='fixed right-5 bg-[#d6482b] text-white text-3xl p-2 rounded-md hover:bg-[#b8381e] lg:hidden'
      >
        <GiHamburgerMenu />
      </div>

      {/* wrapper */}
      <div
        className={`w-[100%] sm:w-[300px] bg-[#f1f0ec] h-full fixed top-0 
          ${
            show ? 'left-0' : 'left-[-100%]'
          } transition-all duration-100 p-4 flex flex-col justify-between lg:left-0 border-r-2 border-r-stone-500`}
      >
        <div className='relative'>
          <Link to='/'>
            <h4 className='text-2xl font-semibold mb-4 '>
              Prime<span className='text-[#d4682b]'>Bid</span>
            </h4>
          </Link>

          <ul
            className='flex flex-col gap-3 
          '
          >
            {/* Auction */}
            <li>
              <Link
                to='/auction'
                className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
              >
                <RiAuctionFill /> Auctions
              </Link>
            </li>
            {/* Leaderboard */}
            <li>
              <Link
                to='/leaderbaord'
                className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
              >
                <MdLeaderboard /> Leaderboard
              </Link>
            </li>
            {isAuthenticated && user && user.role == 'Auctioneer' && (
              <>
                <li>
                  <Link
                    to='/submit-commission'
                    className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </Link>
                </li>
                <li>
                  <Link
                    to='/create-auction'
                    className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
                  >
                    <IoIosCreate /> Create Auction
                  </Link>
                </li>
                {/* Created Auciton by auctioneer */}
                <li>
                  <Link
                    to='/view-my-auction'
                    className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
                  >
                    <FaEye /> View Auction
                  </Link>
                </li>
              </>
            )}

            {isAuthenticated && user && user.role === 'Super Admin' && (
              <>
                <li>
                  <Link
                    to='/dashboard'
                    className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
                  >
                    <MdDashboard /> Dashboard
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!isAuthenticated ? (
            <div className='my-4 flex gap-2'>
              <Link to='/sign-up'>
                <b>Sign Up</b>
              </Link>
              <Link to='/login'>
                <b>Login</b>
              </Link>
            </div>
          ) : (
            <div className='my-4 flex gap-2' onClick={handleLogout}>
              <button>Logout</button>
            </div>
          )}
          <hr className='mb-4 border-t-[#d6482b]' />
          <ul className=' flex flex-col gap-3'>
            <li>
              <Link
                to='/how-it-works-info'
                className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
              >
                <SiGooglesearchconsole /> How It Works
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='flex text-xl gap-2 font-semibold items-center hover:text-[#d4682b] hover:transition-all hover:duration-150'
              >
                <BsFillInfoSquareFill /> About US
              </Link>
            </li>
          </ul>

          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className='absolute top-0 right-5 text-[28px] sm:hidden '
          />
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
