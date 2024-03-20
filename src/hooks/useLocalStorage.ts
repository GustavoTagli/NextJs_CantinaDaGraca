import { useEffect, useState } from "react"

const setWithExpiry = <T>(key: string, value: T, ttl: number) => {
	const now = new Date()
	const item = {
		value: value,
		expiry: now.getTime() + ttl
	}
	localStorage.setItem(key, JSON.stringify(item))
}

const getWithExpiry = (key: string) => {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date().getTime()
	if (now > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export function useLocalStorage<T>(item: string, initialValue: T) {
	const [val, setVal] = useState<T>(initialValue)

	useEffect(() => {
		if (typeof window === "undefined") return
		let val = getWithExpiry(item)
		if (val) setVal(val)
	}, [])

	const updateLocalStorage = (newValue: T) => {
		setVal(newValue)
		setWithExpiry(item, newValue, 1000 * 60 * 60 * 6)
	}

	return {
		value: val,
		updateLocalStorage
	}
}
