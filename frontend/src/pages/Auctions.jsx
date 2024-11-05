import Card from '@/custom-components/Card';
import { useSelector } from 'react-redux';

const Auctions = () => {
  const { loading, allAuctions } = useSelector((state) => state.auction);
  return (
    <div>
      <section className='w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col  '>
        {loading ? (
          'Loading....🔃'
        ) : (
          <section className='my-8'>
            <h1>Auctions</h1>
            <div className='flex flex-wrap gap-6 '>
              {allAuctions.map((element) => (
                <Card
                  key={element._id}
                  id={element._id}
                  title={element.title}
                  startTime={element.startTime}
                  endTime={element.endTime}
                  imgSrc={element.image?.url}
                />
              ))}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Auctions;
