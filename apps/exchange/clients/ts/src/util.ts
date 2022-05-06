import { inspect } from 'util'

export const deepLog = (obj: object) => {
    console.log(inspect(obj, { showHidden: false, depth: null, colors: true }))
}
