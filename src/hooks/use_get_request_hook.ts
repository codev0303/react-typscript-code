import { AxiosError } from "axios";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import { Dispatch } from "redux";
import http from "../helpers/http";
// import { SHOW_SNACKBAR, showSnackbar} from "../../store/actions/core_action";
import {updateQueryParams} from "../helpers/url";
import {isTypeOf} from "../helpers/utility";
import { setError } from "../store/actions/errorAction";
import { HookConfig, HookResponseShape } from "./type";



const defaultErrorCallback = (error: AxiosError, type: string, dispatch: (arg: (object | (() => void))) => void) => {
  if (!error?.response) {
    dispatch(setError({
      title: "Error message",
      body:`Error PERFORMING ACTION`,
      showError: true,
      type: 'error'
    }))
  } else {
    dispatch(setError({
      title: "Error message",
      body:`Error getting ${type}: ${error.message}`,
      showError: true,
      type: 'error'
    }))
  }
};

const useHTTPGetRequest =  <T>(route: string, type: string, params?: {}, config?: HookConfig<T>) => {
  const mountedRef = useRef(true);
  let c = config;

  const dispatch: Dispatch<any> = useDispatch();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  if (params) {
    route = updateQueryParams({route, params}).route;
  }
  if (c && !isTypeOf('Function', c?.errorCallBack)) {
    c.errorCallBack = defaultErrorCallback;
  }

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  useEffect(() => {
    
    if(c?.reloadCondition) {
      setData(null);
      setLoading(true);
      http.get<T>(route).then(
        (response) => {
          if (!mountedRef.current) return null;
          setData(response.data);
          setLoading(false);
        },
        (error:AxiosError) => {
         
          if (!mountedRef.current) return null;
          if(c?.errorCallBack && isTypeOf('Function', c?.errorCallBack)){
            c?.errorCallBack(error,type, dispatch);
            if(c.errorData){
              setData(c?.errorData);
            }
            setLoading(false);
          }
         
        }
      );
    }
  }, [route, type, data, c?.reloadCondition, c?.errorCallBack, c?.errorData, c, dispatch ]);
  const result: HookResponseShape<T> = {
    loading,
    data: data as T
  }
  return result;
};

export default useHTTPGetRequest;
