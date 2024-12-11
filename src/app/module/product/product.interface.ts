export enum TBikeCategory {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  Electric = "Electric",
}

export type TProduct = {
  name: string;
  brand: string;
  price: number;
  category: TBikeCategory;
  description: string;
  quantity: number;
  inStock: boolean;
};
