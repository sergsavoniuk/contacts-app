import { useReducer } from "react";

const INPUT_CHANGE = "INPUT_CHANGE";
const SET_INITIAL_VALUES = "SET_INITIAL_VALUES";
const FORM_SUBMITTING = "FORM_SUBMITTING";
const SET_ERRORS = "SET_ERRORS";

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
    case SET_INITIAL_VALUES: {
      return {
        ...state,
        values: action.payload.values
      };
    }
    case FORM_SUBMITTING: {
      return {
        ...state,
        isSubmitting: true
      };
    }
    case SET_ERRORS: {
      const errors = action.payload.errors;
      return {
        ...state,
        errors,
        isSubmitting: errors === undefined
      };
    }
    default:
      return state;
  }
}

function init(initialState) {
  return {
    values: initialState,
    errors: undefined,
    isSubmitting: false
  };
}

export default function useFormValidation({ initialState, validate, submit }) {
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

  function setInitialValues(values) {
    dispatch({
      type: SET_INITIAL_VALUES,
      payload: {
        values
      }
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    dispatch({ type: FORM_SUBMITTING });

    const errors = validate(state.values);

    if (Object.keys(errors).length === 0) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors: undefined
        }
      });
      submit();
    } else if (errors) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          errors
        }
      });
    }
  }

  return {
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setInitialValues,
    handleChange,
    handleSubmit
  };
}
