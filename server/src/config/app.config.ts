export default {
    port: () => process.env.PORT || 4000,
    env: () => process.env.NODE_ENV || 'development'
}
