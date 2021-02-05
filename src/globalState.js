const { atom } = require('recoil')

export const searchName = atom({
    key: 'searchName',
    default: ''
})

export const actorSelect = atom ({
    key: 'actorSelect',
    defaut: ''
})

export const image = atom ({
    key: 'image',
    default: ''
})

export const displayName = atom ({
    key: 'displayName',
    default: ''
})

export const knownFor = atom ({
    key: 'knownFor',
    default: ''
})

export const actorId = atom ({
    key: 'actorId',
    default: ''
})

export const actorImages = atom ({
    key: 'actorImages',
    default: []
})

export const notActor = atom ({
    key: 'notActor',
    default: 'home'
})

export const actorBio = atom ({
    key: 'actorBio',
    default: ''
})

export const actorFilmography = atom ({
    key: 'actorFilmography',
    default: []
})

export const top100 = atom ({
    key: 'top100',
    default: []
})

export const upComing = atom ({
    key: 'upComing',
    default: []
})

export const responseData = atom ({
    key: 'responseData',
    default: []
})

export const genres = atom ({
    key: 'genres',
    default: []
})

export const rating = atom ({
    key: 'rating',
    default: 0
})

export const plot = atom ({
    key: 'plot',
    default: ''
})

export const rated = atom ({
    key: 'rated',
    default: ''
})

export const ratedBecause = atom ({
    key: 'ratedBecause',
    default: ''
})

export const topBilled = atom ({
    key: 'topBilled',
    default: []
})

export const topSix = atom ({
    key: 'topSix',
    default: []
})

export const topDisplayReady = atom ({
    key: 'topDisplayReady',
    default: false
})

export const runShow = atom ({
    key: 'runShow',
    default: false
})

export const runTopSix = atom ({
    key: 'runTopSix',
    default: []
})

export const trailer = atom ({
    key: 'trailer',
    default: ''
})

export const trailerId = atom ({
    key: 'trailerId',
    default: ''
})