export function evernote(state, action) {
	switch (action.type) {
		case "UPDATE":
			return { ...state, note: action.payload };
		default:
			return state;
	}
}
