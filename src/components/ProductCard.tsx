import {IProductList} from "../interface/productInterface";
import {textSlicer} from "../utils/function";
import Image from "./Image";
import Button from "./ui/Button/Button";
import CircleColors from "./ui/Colors/CircleColors";

interface IProps {
  product: IProductList;
  setProductEdit: (product: IProductList) => void;
  openEditModal: () => void;
  setProductEditIndex: (index: number) => void;
  index : number;
  OpenConfirmModal : () => void;

}

const ProductCard = ({product, setProductEdit, openEditModal , index ,setProductEditIndex , OpenConfirmModal}: IProps) => {
  const {title, description, imageURL, price, colors, category} = product;
  //------------ Render ------------//
  const renderColorCircle = colors.map((color) => (
    <CircleColors key={color} color={color}/>
  ));
  //------------ Handler ------------//
  const numberWithCommas = (price: string | number): string => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const onEdit = () => {
    setProductEdit(product)
    openEditModal()
    setProductEditIndex(index)
  }

  const onRemove = ()=>{
    setProductEdit(product)
    OpenConfirmModal();
  }
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
        <div className="flex items-center space-x-1 my-2 py-2 cursor-pointer flex-wrap">
          {renderColorCircle.length === 0 ? "Not Available Color" : renderColorCircle}
        </div>

        <div className="flex items-center justify-between">
          <span>${numberWithCommas(price)}</span>
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
          <Button className="bg-indigo-600 hover:bg-indigo-300" width="w-full" onClick={onEdit}>
            EDIT
          </Button>
          <Button className="bg-red-600 hover:bg-red-300" width="w-full" onClick={onRemove}>
            Remove
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
