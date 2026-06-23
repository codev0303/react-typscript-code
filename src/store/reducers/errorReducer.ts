import * as actionTypes from "../actionTypes"

const initialState: ErrorState = {
  error: 
    {
     
      title: "",
      body:
        "",
        showError: false,
        type: ''
    },
}

const reducer = (
    state: ErrorState = initialState,
    action: ErrorAction
  ): ErrorState => {
    switch (action.type) {
      case actionTypes.ERROR_MESSAGE:
        const newError: IError = {
          title: action.error.title,
          body: action.error.body,
          showError: action.error.showError,
          type:action.error.type
        }
        return {
          ...state,
          error: newError,
        }
    }
    return state
  }
  
  export default reducer;
