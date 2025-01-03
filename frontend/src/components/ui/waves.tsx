import React from 'react';

const Waves: React.FC = () => {
  return (
    <div className="relative xl:top-[150px] w-full overflow-hidden">
        <div className='h-22px'>
            <img
                src="/src/assets/images/wave4.png"
                alt="wave 4"
                className="absolute bottom-0 w-full h-full opacity-50"
            />      <img
                src="/src/assets/images/wave3.png"
                alt="wave 3"
                className="absolute bottom-0 w-full h-full opacity-50"
            />        <img
                src="/src/assets/images/wave2.png"
                alt="wave 2"
                className="absolute bottom-0 w-full h-full opacity-50"
            />    
            <img
                src="/src/assets/images/wave1.png"
                alt="wave 1"
                className="w-full h-full opacity-50"
            />
        </div>
    </div>
  );
};

export default Waves;
