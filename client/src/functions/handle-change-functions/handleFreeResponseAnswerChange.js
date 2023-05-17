export default async function handleFreeResponseAnswerChange (e, optionID, setAnswerData) {

  let { value } = e.target;

  console.log(value)

  setAnswerData(prevState => ({
    ...prevState,
    option_id: optionID,
    free_response: value
  }))
}