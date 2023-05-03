export default {
    jwt: {
        access_token: () => process.env.JWT_ACCESS_TOKEN,
        refresh_token: () => process.env.JWT_REFRESH_TOKEN
    }
}