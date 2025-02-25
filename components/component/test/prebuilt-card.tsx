import Image from 'next/image';

export default function PrebuildCard({
  src,
  alt,
  title,
  subtitle,
  price,
  items,
  discountPrice
}: {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  price: number;
  items: string[];
  discountPrice?: number;
}) {
  return (
    <div className="w-fit justify-center">
      <div className="bg-[#242424] p-2 text-rakitin-orange ">
        <h1 className="text-2xl font-bold text-center tracking-tighter uppercase">{title}</h1>
        <h1 className="text-sm font-regular text-white capitalize text-center">{subtitle}</h1>
      </div>
      <Image
        src={src}
        alt={alt}
        width={300}
        height={300}
        className="aspect-[4/4] w-full max-w-[400px] object-cover transition-all mx-auto"
        quality={100}
      />
      <div className="bg-[#242424] py-2 px-5">
      <ul className="list-none list-inside text-sm">
          {(Array.isArray(items) ? items : JSON.parse(items || "[]")).map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="bg-[#C62300] min-h-[80px] py-4 px-6 text-center align-center place-content-center">
        {(discountPrice && discountPrice !== 0) ? (
          <div className="flex flex-col items-center">
            <span className="text-xl font-bold text-red-500">
              Rp. {price.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-500 line-through">
              Rp. {discountPrice.toLocaleString()}
            </span>
          </div>
        ) : (
          <h1 className="text-lg font-bold text-white">
            Rp. {price.toLocaleString()}
          </h1>
        )}
      </div>
    </div>
  );
}
