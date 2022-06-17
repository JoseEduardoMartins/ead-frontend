import api from './api';

const signIn = async () => {
    return await api.get(`/user/signin/`, {})
    .then(response => response.data)
    .catch(error => error);
}

const signOut = async () => {
    return await api.get(`/user/signOut/`, {})
    .then(response => response)
    .catch(error => error);
}

export { signIn, signOut };