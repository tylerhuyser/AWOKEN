export default function handleInputChange(e, setInputValues) {
  let { name, value } = e.target
  setInputValues(prevState => ({
    ...prevState,
      [name]: value
  }))
}