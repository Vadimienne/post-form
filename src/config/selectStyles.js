export const borderColorize = {
    control: (provided, state) => ({
        ...provided,
        height: '40px',
        borderColor: '#e6e6e6',
        '&:hover': {
            borderColor: '#363636'
        },
        boxShadow: 0
    })
}

export const selectStyleShort = {
    container: (provided, state) => ({
        ...provided,
        width:'100px'
    }),
    ...borderColorize
}

export const selectStyleMedium = {
    container: (provided, state) => ({
        ...provided,
        width:'270px'
    }),
    ...borderColorize
}

export const selectStyleLong = {
    container: (provided, state) => ({
        ...provided,
        width:'570px'
    }),
    ...borderColorize
}

export const borderInvalid = {
    control: (provided, state) => ({
        ...provided,
        borderColor: '#ff451c',
        boxShadow: 0,
        height: '40px'
    })
}
