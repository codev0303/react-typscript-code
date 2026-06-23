import { AxiosError } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import http from "../helpers/http";
import { updateQueryParams } from "../helpers/url";
import { setError } from "../store/actions/errorAction";
import { HookConfig, HookResponseShape } from "./type";

const defaultErrorCallback = (
  error: AxiosError,
  type: string,
  dispatch: Dispatch<any>
) => {
  if (!error?.response) {
    dispatch(
      setError({
        title: "Error message",
        body: "Error PERFORMING ACTION",
        showError: true,
        type: "error",
      })
    );
  } else {
    dispatch(
      setError({
        title: "Error message",
        body: `Error getting ${type}: ${error.message}`,
        showError: true,
        type: "error",
      })
    );
  }
};

const useHTTPGetRequest = <T>(
  route: string,
  type: string,
  params?: Record<string, unknown>,
  config?: HookConfig<T>
) => {
  const mountedRef = useRef(true);
  const dispatch: Dispatch<any> = useDispatch();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const resolvedRoute = useMemo(() => {
    if (params && Object.keys(params).length) {
      return updateQueryParams({ route, params }).route;
    }
    return route;
  }, [route, params]);

  const reloadCondition = config?.reloadCondition ?? false;
  const errorCallBack = config?.errorCallBack ?? defaultErrorCallback;
  const errorData = config?.errorData;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!reloadCondition) {
      return;
    }

    setLoading(true);
    let cancelled = false;

    http.get<T>(resolvedRoute).then(
      (response) => {
        if (cancelled || !mountedRef.current) return;
        setData(response.data);
        setLoading(false);
      },
      (error: AxiosError) => {
        if (cancelled || !mountedRef.current) return;
        errorCallBack(error, type, dispatch);
        if (errorData !== undefined) {
          setData(errorData);
        }
        setLoading(false);
      }
    );

    return () => {
      cancelled = true;
    };
  }, [resolvedRoute, type, reloadCondition, errorCallBack, errorData, dispatch]);

  const result: HookResponseShape<T> = {
    loading,
    data: data as T,
  };
  return result;
};

export default useHTTPGetRequest;
