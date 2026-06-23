interface IError {
    title: string
    body?: string
    showError?: boolean,
    type?:string
  }
  
  type ErrorState = {
    error: IError
  }
  
  type ErrorAction = {
    type: string
    error: IError
  }
  
  type DispatchType = (args: ErrorAction) => ErrorAction
