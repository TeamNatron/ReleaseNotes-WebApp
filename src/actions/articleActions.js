export const CREATE = "CREATE";
export const UPDATE = "UPDATE";
export const DELETE = "CREATE";

export function updateArticle(payload) {
    return {
        type: UPDATE,
        payload: payload
    }
}

export function createArticle(article) {
    return  {
        type: CREATE,
        payload: article
    }
}