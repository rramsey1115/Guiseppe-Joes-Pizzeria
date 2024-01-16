export const getUserProfiles = () => {
    return fetch(`/api/userprofile`).then(res => res.json());
}