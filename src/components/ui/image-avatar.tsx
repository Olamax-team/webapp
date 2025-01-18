import { cn } from '../../lib/utils';

type Props = {
  image: string;
  style: string;
}

const ImageAvatar = ({image, style}: Props) => {
  return (
    <div className={cn('rounded-full', style)}>
      <img src={image} alt="profile" className='object-cover rounded-full h-full w-full'/>
    </div>
  )
}

export default ImageAvatar