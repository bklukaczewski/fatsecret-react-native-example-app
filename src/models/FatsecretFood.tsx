export enum FatsecretFoodType {
  Brand = 'Brand',
  Generic = 'Generic',
}

export enum FatsecretServingUnit {
  Grams = 'g',
  Mililiters = 'ml',
  Ounces = 'oz',
}

export interface FatsecretFood {
  food_id: string;
  food_name: string;
  food_type: FatsecretFoodType;
  food_url: string;
  brand_name?: string;
  food_description?: string;
  servings?: {
    serving: FatsecretServing[];
  };
}

/* The response from Fatsecret API can have either list of foods or single food object. */
export interface FatsecretResponse {
  foods?: {
    food: FatsecretFood[];
    max_results: number;
    total_results: number;
    page_number: number;
  };
  food?: FatsecretFood;
}

export interface FatsecretServing {
  serving_id: string;
  serving_description: string;
  serving_url: string;
  metric_serving_amount: number;
  metric_serving_unit: FatsecretServingUnit;
  number_of_units: number;
  measurement_description: string;
  calories: number;
  carbohydrate: number;
  protein: number;
  fat: number;
  saturated_fat: number;
  polyunsaturated_fat: number;
  monounsaturated_fat: number;
  trans_fat: number;
  cholesterol: number;
  sodium: number;
  potassium: number;
  fiber: number;
  sugar: number;
  vitamin_a: number;
  vitamin_c: number;
  calcium: number;
  iron: number;
}
