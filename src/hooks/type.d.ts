import { AxiosError } from "axios"
import { Dispatch } from "redux"


export interface HookResponseShape<T>{
    data: T,
    loading: boolean
}

export interface HookConfig<T>{
    errorCallBack?: (error: AxiosError, type: string, dispatch: Dispatch<any>) => void,
    reloadCondition: boolean,
    errorData?: T,
    updateCondition?:boolean
  } 