import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
   FETCH_CATEGORIES, 
   FETCH_CATEGORIES_SUCCESS,
   FETCH_CATEGORIES_FAILURE,
   RESET_CATEGORIES,
   CREATE_CATEGORY,
   CREATE_CATEGORY_SUCCESS,
   CREATE_CATEGORY_FAILURE,
   RESET_NEW_CATEGORY,
   VALIDATE_CATEGORY_FIELDS,
   VALIDATE_CATEGORY_FIELDS_SUCCESS,
   VALIDATE_CATEGORY_FIELDS_FAILURE,
   RESET_CATEGORY_FIELDS,
   FETCH_CATEGORY,
   FETCH_CATEGORY_SUCCESS,
   FETCH_CATEGORY_FAILURE,
   RESET_ACTIVE_CATEGORY,
   DELETE_CATEGORY,
   DELETE_CATEGORY_SUCCESS,
   DELETE_CATEGORY_FAILURE,
   RESET_DELETED_CATEGORY
} from './types/index';

export function fetchCategories() {
  const request = axios({
    method: 'get',
    url: `${API_URL}/categories`,
    headers: []
  });

  return {
    type: FETCH_CATEGORIES,
    payload: request
  };
}

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error
  };
}

export function validateCategoryFields(props) {
  //note: we cant have /categories/validateFields because it'll match /categories/:id path!
  const request = axios.post(`${API_URL}/categories/validate/fields`, props);

  return {
    type: VALIDATE_CATEGORY_FIELDS,
    payload: request
  };
}

export function validateCategoryFieldsSuccess() {
  return {
    type: VALIDATE_CATEGORY_FIELDS_SUCCESS
  };
}

export function validateCategoryFieldsFailure(error) {
  return {
    type: VALIDATE_CATEGORY_FIELDS_FAILURE,
    payload: error
  };
}

export function resetCategoryFields() {
  return {
    type: RESET_CATEGORY_FIELDS
  }
}
;


export function createCategory(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${API_URL}/categories`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_CATEGORY,
    payload: request
  };
}

export function createCategorySuccess(newCategory) {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: newCategory
  };
}

export function createCategoryFailure(error) {
  return {
    type: CREATE_CATEGORY_FAILURE,
    payload: error
  };
}

export function resetNewCategory() {
  return {
    type: RESET_NEW_CATEGORY
  }
}
;

export function resetDeletedCategory() {
  return {
    type: RESET_DELETED_CATEGORY
  }
}
;

export function fetchCategory(id) {
  const request = axios.get(`${API_URL}/categories/${id}`);

  return {
    type: FETCH_CATEGORY,
    payload: request
  };
}


export function fetchCategorySuccess(activeCategory) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: activeCategory
  };
}

export function fetchCategoryFailure(error) {
  return {
    type: FETCH_CATEGORY_FAILURE,
    payload: error
  };
}

export function resetActiveCategory() {
  return {
    type: RESET_ACTIVE_CATEGORY
  }
}


export function deleteCategory(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${API_URL}/categories/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_CATEGORY,
    payload: request
  };
}

export function deleteCategorySuccess(deletedCategory) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: deletedCategory
  };
}

export function deleteCategoryFailure(response) {
  return {
    type: DELETE_CATEGORY_FAILURE,
    payload: response
  };
}