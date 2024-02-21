import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/ui/Modal/Modal";
import { productList } from "./data/productlist";
import Button from "./components/ui/Button/Button";
import { formList } from "./data/formList";
import Input from "./components/ui/Form/Input";

function App() {
  //------------ state ------------//
  const [isOpen, setIsOpen] = useState(false);

  //------------ Handler ------------//
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log(isOpen);
    setIsOpen(true);
  }
  //------------ Render ------------//
  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  const renderFormList = formList.map((input) => (
    <div className="flex flex-col ">
      <label htmlFor={input.id} className="text-md font-medium">
        {input.label}
      </label>
      <Input type={input.type} name={input.name} id={input.id} />
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
          <form className="space-y-3">
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
                onClick={closeModal}
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
