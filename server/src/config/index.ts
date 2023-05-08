import app from './app.config.js'
import auth from './auth.config.js'

const configs = {
    app,
    auth
}

export default configs

export const config = (key: string): any => {
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

        return (<any>config)()
    } catch (e) {
        return null
    }
}
