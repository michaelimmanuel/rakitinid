interface CardProps {
    name: string;
    price: number;
    image?: string | null;
    isSelected: boolean;
    onClick: () => void;
  }
  
  export default function Card({ name, price, image, isSelected, onClick }: CardProps) {
    return (
      <div
        className={`bg-rakitin-bg rounded-lg shadow-lg p-4 w-80 cursor-pointer`}
        onClick={onClick}
      >
        <h1 className="text-rakitin-orange text-xl font-bold">{name}</h1>
        <p className="text-white">Rp {price.toLocaleString()}</p>
        {image && <img src={image} alt={name} className="w-full h-auto" />}
      </div>
    );
  }
  