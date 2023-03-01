import '../index.css';

interface ButtonProps{
  contenido:string;
}

const Button = (props:ButtonProps) => {
	return (
		<button className="font-medium bg-emerald-200 p-3 rounded uppercase" type="button">
			{props.contenido}
		</button>
	);
};

export default Button;
