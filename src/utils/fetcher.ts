import axios, { AxiosPromise } from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL as string

export const fetcher = <T>(
	url: string,
	params?: { params: any }
): AxiosPromise<T> => {
	return axios.get(`${API_URL}${url}`, params ? params : {})
}
