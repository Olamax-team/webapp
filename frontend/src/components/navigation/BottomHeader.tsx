import { Link } from 'react-router-dom'

const BottomHeader = () => {
  return (
    <div className='w-full h-[100px]'>
      <div className="xl:w-[1440px] mx-auto border h-full xl:px-[95px] flex items-center">
        <Link to={'/about'}>
          <div className='w-[153px] h-[48px]'>
            <img src="../../../src/assets/images/olamax_logo_2.png" alt="logo" className='object-cover'/>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BottomHeader