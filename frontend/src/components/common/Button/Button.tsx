import '../../index.css';
/* 
interface ButtonProps{
  content:string;
}

export const Button = (props:ButtonProps) => {
	return (
		<button className="font-medium bg-emerald-200 p-3 rounded uppercase" type="button">
			{props.content}
		</button>
	);
};


 */

import React, { ReactNode } from 'react';

interface Props {
  border: string;
  color: string;
  children?: ReactNode;
  height: string;
  onClick: () => void;
  radius: string
  width: string;
  type?: 'primary' | 'secondary' | 'text';
  isBlock?: boolean;
  disabled?: boolean;
  className?: string;
  href?: string;
  target?: string;  

}

const Button = (props: Props): JSX.Element => { 
	const { border, color, children, height, radius, width, onClick } = props;
	return (		
		<button 
			onClick={ onClick }
			style={{
				backgroundColor: color,
				border,
				borderRadius: radius,
				height,
				width
			}}
		>
			{children}
		</button>
	);
};

export default Button;
