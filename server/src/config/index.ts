import app from './app.js'

const configs = {
    app
}

export default configs

export const config = (key: string) => {
    try {
        key = key.replace(/\[(\w+)\]/g, '.$1')
        key = key.replace(/^\./, '')

        const keyArray = key.split('.')

        let config = { ...configs }
        for (let i = 0, n = keyArray.length; i < n; ++i) {
            let subKey = keyArray[i]

            if (subKey in config) {
                config = config[subKey]
            } else {
                return null
            }
        }

        return config
    } catch (e) {
        return null
    }
}
