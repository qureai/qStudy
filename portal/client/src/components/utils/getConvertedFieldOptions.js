function getConvertedFieldOptions (options) {
  return options.map((fieldOptions)=> {
    let value; let label
    if (typeof fieldOptions === 'string') {
      value = fieldOptions
      label = fieldOptions
    } else {
      value = fieldOptions.value
      label = fieldOptions.label
    }

    return {
      label,
      value
    }
  })
}

export default getConvertedFieldOptions
