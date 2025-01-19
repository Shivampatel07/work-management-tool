import { ISuccessResponse } from "@/store/types";
import axios from "axios";

export function getRequestWithToken<T>(path: string, token: string) {
    return axios.get<ISuccessResponse<T>>(`/api/${path}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
