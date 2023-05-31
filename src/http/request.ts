import axios, { type AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";

let url = ''
if(process.env.NODE_ENV === 'development'){
  url = 'http://localhost:3000'
} else {
  // 生产环境
  url = 'http://121.40.174.152:3000/'
}

const service = axios.create({
  baseURL: url,
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
    ElMessage.error("网络连接超时！");
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
