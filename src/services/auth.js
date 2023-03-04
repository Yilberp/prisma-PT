const url_base= import.meta.env.VITE_API_URL
export const signIn=(data)=>{
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    }
    return fetch(url_base + "login", params).then(res => res.json())
}