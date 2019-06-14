export const selectStyleShort = {
  container: (provided, state) => ({
    ...provided,
    width:'100px'
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#e6e6e6',
    '&:hover': {
       borderColor: '#363636'
    },
    boxShadow: 0
  })

}

export const selectStyleMedium = {
  container: (provided, state) => ({
    ...provided,
    width:'270px'
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#e6e6e6',
    '&:hover': {
       borderColor: '#363636'
    },
    boxShadow: 0
  })
}

export const selectStyleLong = {
  container: (provided, state) => ({
    ...provided,
    width:'570px'
  }),
  control: (provided, state) => ({
    ...provided,
    borderColor: '#e6e6e6',
    '&:hover': {
       borderColor: '#363636'
    },
    boxShadow: 0
  })
}
