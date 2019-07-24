export const defaultStyle = {
    control: (provided, state) => ({
        ...provided,
        height: '40px',
        borderColor: '#e6e6e6',
        '&:hover': {
            borderColor: '#363636'
        },
        boxShadow: 0,
    }),
    placeholder: (provided, state) => ({
        ...provided,
        whiteSpace: 'nowrap'
    })
}

export const selectStyleShort = {
    container: (provided, state) => ({
        ...provided,
        width:'100px'
    }),
    ...defaultStyle
}

export const selectStyleMedium = {
    container: (provided, state) => ({
        ...provided,
        width:'270px'
    }),
    ...defaultStyle
}

export const selectStyleLong = {
    container: (provided, state) => ({
        ...provided,
        width:'570px'
    }),
    ...defaultStyle
}

export const borderInvalid = {
    control: (provided, state) => ({
        ...provided,
        borderColor: '#ff451c',
        boxShadow: 0,
        height: '40px'
    })
}
