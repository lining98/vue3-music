import axios, { type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

// axios.defaults.baseURL = "https://www.lghb.top";
axios.defaults.baseURL = "http://localhost:3000";
// axios.defaults.baseURL = 'http://124.222.23.222:3000/';
axios.defaults.timeout = 20 * 1000;

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    ElMessage.error("network error");
    return Promise.reject(err);
  }
);

// 类型定义
interface IHttp {
  get<T>(url: string, params?: unknown): Promise<T>;
  post<T>(url: string, params?: unknown): Promise<T>;
}
const http: IHttp = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default http;
