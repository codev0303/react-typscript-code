import * as actionTypes from "../actionTypes"

export function setError(error: IError) {
  const action: ErrorAction = {
    type: actionTypes.ERROR_MESSAGE,
    error,
  }
  return (dispatch: DispatchType) => {
    dispatch(action)
  }
}
