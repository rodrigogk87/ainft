import IAttributes from "./IAttributes.interface";

export default interface IOpenAImage {
    url: string;
    prompt: string;
    attributes: IAttributes;
}