const url_base= import.meta.env.VITE_API_URL
export const list=(username)=>{
    return fetch(url_base + `users/${username}/bills`).then(res => res.json())
}