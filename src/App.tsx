import {ChangeEvent, FormEvent, useState} from "react";
import {v4 as uuid} from "uuid";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import {productList} from "./data/productList";
import Button from "./components/ui/Button/Button";
import {formList} from "./data/formList";
import Input from "./components/ui/Form/Input";
import {IProductList} from "./interface/productInterface";
import {productValidation} from "./validation/productValidation";
import ErrorMessage from "./components/ui/Error/ErrorMessage";
import CircleColors from "./components/ui/Colors/CircleColors";
import Select from "./components/ui/Select/Select";
import {categories} from "./data/category";
import {colors} from "./data/colors";
import {inputName} from "./components/Types/types.ts";

function App() {
  const defaultProductValue = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  //------------ state ------------//

  const [product, setProduct] = useState<IProductList>(defaultProductValue);
  const [productEdit, setProductEdit] = useState<IProductList>(defaultProductValue);
  const [productEditIndex, setProductEditIndex] = useState<number>(0);
  const [products, setProducts] = useState<IProductList[]>(productList);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [tempColor, setTempColor] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[3]);
  const [colorValidation, setColorValidation] = useState("");
  // const [editColor , setEditColor] = useState<string[]>([]);
  //------------ Handler ------------//
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const closeEditModal = () => setIsOpenEditModal(false);
  const openEditModal = () => setIsOpenEditModal(true);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;

    setProductEdit({
      ...productEdit,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const {title, description, imageURL, price} = product;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg =
      Object.values(errors).some((values) => values === "") &&
      Object.values(errors).every((values) => values === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }
    if (tempColor.length <= 0) {
      setColorValidation("color Is Required");
      return;
    }

    setProducts((prev) => [
      {...product, id: uuid(), colors: tempColor, category: selectedCategory},
      ...prev,
    ]);
    setProduct(defaultProductValue);
    setTempColor([]);
    closeModal();
    // console.log("send data in server");
  };
  const onSubmitEditHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = productEdit;
    const errors = productValidation({
      title,
      description,
      imageURL,
      price,
    });
    const hasErrorMsg =
      Object.values(errors).some((values) => values === "") &&
      Object.values(errors).every((values) => values === "");
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    if (tempColor.length <= 0 ) {
      setColorValidation("color Is Required");
      return;
    }

    let updateProduct :IProductList[] = [...products];
    updateProduct[productEditIndex] = {...productEdit , colors : tempColor.concat(productEdit.colors)};
    setProducts(updateProduct);
    setProductEdit(defaultProductValue);
    setTempColor([]);
    closeEditModal();
    // console.log("send data in server");
  };


  const onCancel = () => {
    setProduct(defaultProductValue);
    setErrors({
      title: "",
      description: "",
      imageURL: "",
      price: "",
    });
    setColorValidation("");
    closeModal();
    closeEditModal()
  };
  //------------ Render ------------//
  const renderProductList = products.map((product, index) => (
    <ProductCard key={product.id} product={product} setProductEdit={setProductEdit}
                 openEditModal={openEditModal} setProductEditIndex={setProductEditIndex} index={index}/>
  ));

  const renderFormList = formList.map((input) => (
    <div className="flex flex-col" key={input.id}>
      <label htmlFor={input.id} className="text-md font-medium">
        {input.label}
      </label>
      <Input
        type={input.type}
        name={input.name}
        id={input.id}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
      {errors[input.name] && <ErrorMessage msg={errors[input.name]}/>}
    </div>
  ));

  const renderColorCircle = colors.map((color) => (
    <CircleColors
      key={color}
      color={color}
      onClick={() => {
        if (tempColor.includes(color)) {
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        if (productEdit.colors.includes(color)) {
          setProductEdit((prev)=> ({...prev , colors : prev.colors.filter(item => item !== color)}))
          setTempColor((prev) => prev.filter((item) => item !== color));
          return;
        }
        // console.log(productEdit.colors)
        setColorValidation("");
        setTempColor((prev) => [...prev, color]);
      }}
    />
  ));

  const renderEditFormWithErrorMsg = (id: string, label: string, name: inputName) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-md font-medium">
          {label}
        </label>
        <Input
          type={"text"}
          name={name}
          id={id}
          value={productEdit[name]}
          onChange={onChangeEditHandler}
        />
        <ErrorMessage msg={errors[name]}/>
      </div>
    )
  }

  return (
    <>
      <main className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className=" border-2 rounded-md font-bold font-sans">
            HI CLIENT
          </h2>
          <Button
            className="bg-cyan-500 my-3 "
            width="w-fit"
            onClick={openModal}
          >
            Add Product
          </Button>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {renderProductList}
        </div>
        {/*Add NEW Product Modal*/}
        <Modal isOpen={isOpen} title="Add NEW Product" closeModal={closeModal}>
          <form className="space-y-3" onSubmit={onSubmitHandler}>
            {renderFormList}
            <Select
              selected={selectedCategory}
              setSelected={setSelectedCategory}
            />
            <div className="flex items-center space-x-2 my-3 cursor-pointer flex-wrap">
              {renderColorCircle}
              <span className="block text-red-800 text-sm font-semibold">
                {colorValidation}
              </span>
              {tempColor.map((color) => (
                <span
                  key={color}
                  className="p-1 mr-1 my-2 rounded-md text-white text-xs"
                  style={{backgroundColor: color}}
                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                className="bg-indigo-600  hover:bg-indigo-300"
                width="w-full"
              >
                Submit
              </Button>
              <Button
                className="bg-gray-600 hover:bg-gray-300"
                width="w-full"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
        {/*-------------------------------*/}
        {/*Edit Product Modal*/}
        <Modal isOpen={isOpenEditModal} title="Edit Product" closeModal={closeEditModal}>
          <form className="space-y-3" onSubmit={onSubmitEditHandler}>
            {renderEditFormWithErrorMsg("title", "Product Title", "title")}
            {renderEditFormWithErrorMsg("description", "Product Description", "description")}
            {renderEditFormWithErrorMsg("imageURL", "Product Image URL", "imageURL")}
            {renderEditFormWithErrorMsg("price", "Product Price", "price")}
            {/*{renderFormList}*/}
            {/*<Select*/}
            {/*  selected={selectedCategory}*/}
            {/*  setSelected={setSelectedCategory}*/}
            {/*/>*/}
            <div className="flex items-center space-x-2 my-3 cursor-pointer flex-wrap">
              {renderColorCircle}
              <span className="block text-red-800 text-sm font-semibold">
                {colorValidation}
              </span>
              {tempColor.concat(productEdit.colors).map((color) => (
                <span
                  key={color}
                  className="p-1 mr-1 my-2 rounded-md text-white text-xs"
                  style={{backgroundColor: color}}

                >
                  {color}
                </span>
              ))}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                className="bg-indigo-600  hover:bg-indigo-300"
                width="w-full"
              >
                Submit
              </Button>
              <Button
                className="bg-gray-600 hover:bg-gray-300"
                width="w-full"
                onClick={onCancel}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </main>
    </>
  );
}

export default App;
