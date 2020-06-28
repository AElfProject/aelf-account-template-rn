import R from 'ramda'
import Immutable from 'seamless-immutable'
import AsyncStorage from '@react-native-community/async-storage'

// is this object already Immutable?
const isImmutable = R.has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({ deep: true })

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = R.when(isImmutable, convertToJs)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

const immutablePersistenceTransform = {
    out: (state) => {
        // console.log({ retrieving: state })
        return toImmutable(state)
    },
    in: (raw) => {
        // console.log({ storing: raw })
        return fromImmutable(raw)
    }
}
// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
    active: true,
    reducerVersion: '1.0',
    storeConfig: {
        key: 'root',
        storage: AsyncStorage,
        // Reducer keys that you do NOT want stored to persistence here.
        // blacklist: [],
        // Optionally, just specify the keys you DO want stored to persistence.
        // An empty array means 'don't store any reducers' -> infinitered/ignite#409
        // whitelist: [],
        transforms: [immutablePersistenceTransform]
    }
}

export default REDUX_PERSIST
