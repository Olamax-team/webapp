import React from 'react';

interface FloatingTagProps {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  rotation: number; // Rotation angle in degrees
  width?: string;
  height?: string;
  text: string;
  borderColor: string;
  textColor: string;
  animate?: string;
  boxPosition?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const FloatingTag: React.FC<FloatingTagProps> = ({
  position,
  rotation,
  width = '160px',
  height = '45px',
  text,
  borderColor,
  textColor,
  animate,
  boxPosition,
}) => {
  const tagStyle: React.CSSProperties = {
    position: 'absolute',
    ...position,
    transform: `rotate(${rotation}deg)`,
    width,
    height,
  };
  const boxStyle: React.CSSProperties = {
    position: 'absolute',
    ...boxPosition,
  };

  return (
    <span
      style={tagStyle}
      className={`flex items-center justify-center rounded-md border-2 ${borderColor} ${textColor} text-sm font-semibold ${animate}`}
    >
      {text}
      <div
        style={boxStyle}
        className={`bg-current w-2 h-2 ${borderColor}`}
      />
    </span>
  );
};

export default FloatingTag;
