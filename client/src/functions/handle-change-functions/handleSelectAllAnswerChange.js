export default async function handleSelectAllAnswerChange (e, optionID, selectAllArray, setSelectAllAnswerData, setSelectAllArray) {

  let { name, value } = e.target;

  if (name === "option_id" && selectAllArray.includes(parseInt(optionID))) {
    setSelectAllArray(prevState => {
      return (prevState.filter(e => e !== value))
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: []
    }))
  } if (name === "option_id" && !selectAllArray.includes(parseInt(optionID))) { 
    setSelectAllArray(prevState => {
      return [...prevState, value]
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: value
    }))
  } if (name === "free_response" && selectAllArray.includes(parseInt(optionID)) && value === "") {
    setSelectAllArray(prevState => {
      return (prevState.filter(e => e !== optionID))
    })
    setSelectAllAnswerData(prevState => ({
        ...prevState,
        option_id: [],
        free_response: ""
    }))
  } if (name === "free_response" && selectAllArray.includes(parseInt(optionID)) && value !== "") {
      setSelectAllAnswerData(prevState => ({
        ...prevState,
        free_response: value
    }))
  } if (name === "free_response" && !selectAllArray.includes(parseInt(optionID))) {
    setSelectAllArray(prevState => {
      return [...prevState, parseInt(optionID)]
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: parseInt(optionID),
      free_response: value
    }))
  }
}