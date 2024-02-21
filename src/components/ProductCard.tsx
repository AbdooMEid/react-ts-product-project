import { IProductList } from "../interface/productInterface";
import { textSlicer } from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button/Button";

interface IProps {
  product: IProductList;
}
const ProductCard = ({ product }: IProps) => {
  const { title, description, imageURL, price, category } = product;
  return (
    <>
      <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 space-y-3 border-2 rounded-md p-2 m-2 flex flex-col">
        <Image
          imageUrl={imageURL}
          alt="Car"
          className="rounded-md h-52 w-full lg:h-full lg:object-cover"
        />

        <h3 className="my-2 text-lg font-semibold">{title}</h3>
        <p className="text-xs text-gray-500 break-words">
          {textSlicer(description)}
        </p>

        <div className="flex items-center space-x-2 my-3 cursor-pointer">
          <span className="w-5 h-5 bg-indigo-500 rounded-full" />
          <span className="w-5 h-5 bg-red-700 rounded-full" />
          <span className="w-5 h-5 bg-yellow-800 rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <span>${price}</span>
          <div className="flex items-center space-x-1">
            <Image
              imageUrl={category.imageURL}
              alt="Car"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>{category.name}</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button className="bg-indigo-600" width="w-full">
            EDIT
          </Button>
          <Button className="bg-red-600" width="w-full">
            DELETE
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;