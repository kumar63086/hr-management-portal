import axios from "axios";           // import the default axios object
import type { AxiosRequestConfig, AxiosResponse } from "axios"; // type-only imports
import Cookies from "js-cookie";
import { accessToken } from "../components/Common/Constants";

// Generic GET request
export async function getData<T = any>(url: string): Promise<AxiosResponse<T>> {
  const token = Cookies.get(accessToken);
 //console.log("🔑 FRONTEND TOKEN:", token);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,  };

  return axios.get<T>(url, config);
}


// Generic POST request
export async function postData<T = any, D = any>(
  url: string,
  data: D
): Promise<AxiosResponse<T>> {
  const token = Cookies.get(accessToken);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  };
  return axios.post<T>(url, data, config);
}

// Generic PUT request
export async function putData<T = any, D = any>(
  url: string,
  data: D
): Promise<AxiosResponse<T>> {
  const token = Cookies.get(accessToken);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  };
  return axios.put<T>(url, data, config);
}


// Generic DELETE request
export async function deleteData<T = any>(
  url: string
): Promise<AxiosResponse<T>> {
  const token = Cookies.get(accessToken);
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
  };
  return axios.delete<T>(url, config);
}
