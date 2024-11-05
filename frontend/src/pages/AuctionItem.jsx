import { getAuctionDetail } from '@/store/slices/AuctionSlice';
import { useEffect, useState } from 'react';
import { FaGreaterThan } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAutenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [navigateTo, isAutenticated, dispatch, id]);
  return (
    <section className='w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col  py-4 '>
      <div className='text-[16px] flex flex-wrap gap-2 items-center'>
        <Link
          to='/'
          className='font-bold transition-all duration-300 hover:text-[#d6482b]'
        >
          Home
        </Link>
        <FaGreaterThan className='text-stone-400' />
        <Link
          to='/auctions'
          className='font-bold transition-all duration-300 hover:text-[#d6482b]'
        >
          Auctions
        </Link>
        <FaGreaterThan className='text-stone-400' />
        <p className='text-stone-400'>{auctionDetail.title}</p>
      </div>
    </section>
  );
};

export default AuctionItem;
