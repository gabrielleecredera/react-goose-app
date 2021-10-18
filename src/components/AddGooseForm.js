import React, { useState } from 'react'
import '../styles/AddGooseForm.css'

const AddGooseForm = (props) => {
  const [name, setName] = useState('')
  const [aggression, setAggression] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !aggression) {
      props.setMsg('why????????')
      return
    }
    fetch('http://localhost:8080/goose', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        aggression: aggression,
      }),
      headers: {'Content-Type': 'application/json'},
    })
      .then(() => {
        props.onAddGoose()
        setName('')
        setAggression(0)
      })
  }

  return (
    <form className="goose-form" onSubmit={handleSubmit}>
      {/* If you need help understanding this syntax, have a look at https://reactjs.org/docs/conditional-rendering.html */}
      {
        showForm ?
        (
          <React.Fragment>
            <input placeholder="Goose name" value={ name } onChange={ (e) => { setName(e.target.value) } } />
            <input placeholder="Aggression" type="number" value={ aggression } onChange={ (e) => { setAggression(e.target.value) } } />
            <button className="primary-btn" type="submit">Add Goose</button>
            <button className="close-btn" onClick={ () => { setShowForm(false) } }>Close</button>
          </React.Fragment>
        ) :
        (
          <React.Fragment>
            <button className="primary-btn" onClick={ () => { setShowForm(true) } }>Add</button>
          </React.Fragment>
        )
      }
    </form>
  )
}

export default AddGooseForm
