import { useReducer, useCallback } from 'react';

const INPUT_CHANGE = 'INPUT_CHANGE';
const SET_INITIAL_VALUES = 'SET_INITIAL_VALUES';
const FORM_SUBMITTING = 'FORM_SUBMITTING';
const SET_ERRORS = 'SET_ERRORS';

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
        values: action.payload.values,
        errors: undefined
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

export default function useFormValidation({
  initialState,
  validate,
  submit,
  redirectAfterSuccess
}) {
  const [state, dispatch] = useReducer(reducer, initialState, init);

  const handleChange = useCallback(event => {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: event.target.name,
        value: event.target.value
      }
    });
  }, []);

  const setInitialValues = useCallback(values => {
    dispatch({
      type: SET_INITIAL_VALUES,
      payload: {
        values
      }
    });
  }, []);

  const handleSubmit = useCallback(
    async event => {
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

        try {
          await submit(state.values);
          redirectAfterSuccess();
        } catch (error) {
          console.error('Server Error', error);
          dispatch({
            type: SET_ERRORS,
            payload: {
              errors: {
                serverError: error.message
              }
            }
          });
        }
      } else if (errors) {
        dispatch({
          type: SET_ERRORS,
          payload: {
            errors
          }
        });
      }
    },
    [state.values, submit, validate, redirectAfterSuccess]
  );

  return {
    values: state.values,
    errors: state.errors,
    isSubmitting: state.isSubmitting,
    setInitialValues,
    handleChange,
    handleSubmit
  };
}
