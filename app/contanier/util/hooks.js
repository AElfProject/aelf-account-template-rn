import { useState, useCallback } from "react"

const useSetState = (initial = {}) => {
	const [state, saveState] = useState(initial)
	const setState = useCallback((newState) => {
		saveState(prev => ({ ...prev, ...newState }))
	}, [])
	return [state, setState]
}
export {
	useSetState
}