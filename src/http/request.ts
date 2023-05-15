import axios, { type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

// axios.defaults.baseURL = "http://localhost:3000";

const service = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://124.222.23.222:3000",
  // baseURL: "http://150.158.159.153:3000",
  // baseURL: "https://service-8drbxr29-1315315277.sh.apigw.tencentcs.com/release",
  timeout: 20000,
  withCredentials: true,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    config.params = {
      ...config.params,
      timestamp: Date.now(),
    };
    return config;
  },
  (err) => Promise.reject(err)
);

// 响应拦截器
service.interceptors.response.use(
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
      service
        .get(url, {
          params,
        })
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
      service
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
