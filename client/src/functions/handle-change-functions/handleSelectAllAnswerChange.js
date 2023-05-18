export default async function handleSelectAllAnswerChange (e, optionID, selectAllArray, setSelectAllArray, setSelectAllAnswerData) {

  let { name, value } = e.target;

  if (name === "option_id" && selectAllArray.includes(parseInt(value))) {
    console.log("Handle-Select-All-Answer-Change: NON-Free Response Condition #1")
    setSelectAllArray(prevState => {
      return (prevState.filter(e => e !== parseInt(value)))
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: []
    }))
  } else if (name === "option_id" && !selectAllArray.includes(parseInt(value))) { 
    console.log("Handle-Select-All-Answer-Change: NON-Free Response Condition #2")
    setSelectAllArray(prevState => {
      return [...prevState, parseInt(value)]
    })
    setSelectAllAnswerData(prevState => ({
      ...prevState,
      option_id: value
    }))
  } else if (name === "free_response" && selectAllArray.includes(parseInt(optionID)) && value === "") {
    console.log("Handle-Select-All-Answer-Change: Free Response Condition #1")
    setSelectAllArray(prevState => {
      return (prevState.filter(e => e !== parseInt(optionID)))
    })
    setSelectAllAnswerData(prevState => ({
        ...prevState,
        option_id: [],
        free_response: ""
    }))
  } else if (name === "free_response" && selectAllArray.includes(parseInt(optionID)) && value !== "") {
    console.log("Handle-Select-All-Answer-Change: Free Response Condition #2")
    console.log(value)
      setSelectAllAnswerData(prevState => ({
        ...prevState,
        free_response: value
    }))
  } else if (name === "free_response" && !selectAllArray.includes(parseInt(optionID))) {
    console.log("Handle-Select-All-Answer-Change: Free Response Condition #3")
    console.log(value)
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