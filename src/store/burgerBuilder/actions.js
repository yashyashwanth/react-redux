import * as types from "./types";

export const addIngredient = name => {
  return {
    type: types.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = name => {
  return {
    type: types.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = ingredients => {
  return {
    type: types.SET_INGREDIENTS,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: types.FETCH_INGREDIENTS_FAILED
  };
};

export const initIngredients = () => {
  return {
    type: types.INIT_INGREDIENTS
  };
};
