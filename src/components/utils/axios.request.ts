import { ISuccessResponse } from "@/store/types";
import axios from "axios";

export function getRequestWithToken<T>(path: string) {
    return axios.get<ISuccessResponse<T>>(`/api/${path}`);
}

export function postRequestWithoutToken<T>(path: string, data: Record<string, unknown>) {
    return axios.post<ISuccessResponse<T>>(`/api/${path}`, data);
}

export function postRequestWithToken<T>(path: string, data: Record<string, unknown>, token: string) {
    return axios.post<ISuccessResponse<T>>(`/api/${path}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
