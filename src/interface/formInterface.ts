type inputName = "title" | "description" | "price" | "imageURL";

export interface IFormList {
  id: string;
  label: string;
  name: inputName;
  type: string;
}
