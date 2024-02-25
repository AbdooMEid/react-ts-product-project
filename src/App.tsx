import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import { productList } from "./data/productlist";
import Button from "./components/ui/Button/Button";
import { formList } from "./data/formList";
import Input from "./components/ui/Form/Input";
import { IProductList } from "./interface/productInterface";
import { productValidation } from "./validation/productValidation";
import ErrorMessage from "./components/ui/Error/ErrorMessage";

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
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  console.log(errors);
  //------------ Handler ------------//
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setProduct({
      ...product,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };
  const onSubmitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const { title, description, imageURL, price } = product;
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
    console.log("send data in server");
  };

  const onCancel = () => {
    setProduct(defaultProductValue);
    closeModal();
  };
  //------------ Render ------------//
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
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
      {errors[input.name] && <ErrorMessage msg={errors[input.name]} />}
    </div>
  ));

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
        <Modal isOpen={isOpen} title="Add NEW Product" closeModal={closeModal}>
          <form className="space-y-3" onSubmit={onSubmitHandler}>
            {renderFormList}
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
