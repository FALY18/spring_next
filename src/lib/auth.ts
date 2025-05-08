// utils/auth.ts
export function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem("token");
	}
	 export function getUserRole() {
	if (typeof window === "undefined") return null;
	const token = getToken();
	if (!token) return null;
	    
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		return payload.role || null;
	} catch (err) {
		return null;
	}
    }
    	export function isAuthenticated() {
	return !!getToken();
	}
      