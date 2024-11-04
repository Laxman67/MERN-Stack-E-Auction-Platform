import { postCommissionProof } from '@/store/slices/CommissionSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SubmitCommission = () => {
  const [proof, setProof] = useState('');
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [proofPreview, setProofPreview] = useState('');

  const proofHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProof(file);
      setProofPreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);

  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('proof', proof);
    formData.append('amount', amount);
    formData.append('comment', comment);
    dispatch(postCommissionProof(formData));
  };

  useEffect(() => {}, []);
  return (
    <>
      <section className='w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start'>
        <div className='bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md '>
          <form
            className='flex flex-col gap-5 w-full'
            onSubmit={handlePaymentProof}
          >
            <h3
              className={`text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}
            >
              Upload Payment Proof
            </h3>

            <div className='flex flex-col gap-2'>
              <label className='text-[16px] text-stone-500'>Amount</label>
              <input
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className='w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'
              />
            </div>

            {/* Payment Proof */}
            <div className='flex gap-2 sm:flex-row'>
              <div
                className='
              '
              >
                <label className='text-[16px] text-stone-500'>
                  Payment Proof / Image (ScreenShot)
                </label>
                <input
                  type='file'
                  onChange={proofHandler}
                  className='w-full text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'
                />
              </div>

              <div className='h-[100px] mx-auto'>
                <img
                  className=' rounded-sm h-[100%] sm:hover:scale-150 transition-all duration-150'
                  src={proofPreview ? proofPreview : ''}
                  alt='Proof Preview'
                />
              </div>
            </div>

            {/* Comment */}
            <div className='flex flex-col gap-2'>
              <label className='text-[16px] text-stone-500'>Comment</label>
              <textarea
                value={comment}
                rows='5'
                onChange={(e) => setComment(e.target.value)}
                className=' p-3 box-border w-full text-[16px] pt-6 bg-transparent border-[1px] border-stone-600 focus:outline-none rounded-md'
              ></textarea>
            </div>

            <button
              className={`bg-[#d6482b]  text-white my-4 font-semibold hover:bg-[#b8381e] transition-all duration-150 text-xl py-2 px-4 rounded-sm w-[280px] lg:w-[640px] mx-auto ${
                loading ? 'cursor-not-allowed' : ''
              }`}
              type='submit'
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SubmitCommission;
