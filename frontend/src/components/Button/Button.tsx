import '../../index.css';

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


