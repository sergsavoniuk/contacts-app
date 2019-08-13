import { useReducer, useEffect } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";
const FORM_SUBMITTING = "FORM_SUBMITTING";

function reducer(state, action) {
  switch (action.type) {
    case INPUT_CHANGE: {
      return {
        ...state,
        values: {
          ...state.values,
          [action.payload.name]: action.payload.value
        }
      };
    }
    case FORM_SUBMITTING: {
      return {
        ...state,
        isSubmitting: true
      };
    }
    default:
      return state;
  }
}

function init(initialState) {
  return {
    values: initialState,
    errors: null,
    isSubmitting: false
  };
}

export default function useFormValidation({
  initialState,
  validate,
  authenticate
}) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  function handleChange(event) {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: event.target.name,
        value: event.target.value
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: FORM_SUBMITTING });
    authenticate();
  }

  return {
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleSubmit
  };
}
