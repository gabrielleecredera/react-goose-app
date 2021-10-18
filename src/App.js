import './styles/App.css';
import Goose from './components/Goose'
import AddGooseForm from './components/AddGooseForm'
import { useState, useEffect } from 'react'

function App() {
  const [msg, setMsg] = useState('')
  const [geese, setGeese] = useState([])
  const [filterText, setFilterText] = useState("")

  const fetchGoose = () => {
    fetch("http://localhost:8080/geese")
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((response) => {
              setGeese(response)
            })
        }
      })
  }

  useEffect(() => {
    fetchGoose()
  })

  const deleteGoose = (id) => {
    fetch('http://localhost:8080/goose/' + id, {
      method: 'DELETE',
    })
      .then(() => {
        fetchGoose()
        setMsg('Goose deleted')
      })
  }

  const onAddGoose = () => {
    fetchGoose()
    setMsg('Goose added')
  }

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg('')
      }, 2000)
    }
  }, [msg])

  return (
    <div className="container">
      <div className="msg">{msg}</div>
      <br/>
      <input className="filter-input" placeholder="Filter by name" value={ filterText } onChange={ (e) => { setFilterText(e.target.value) } } />
      {/*
        Filter geese by our search keyterm and map it to <Goose/> objects
        Note: onDelete is a prop where a function is passed in
      */}
      { geese
          .filter((goose) => { return goose.name.toLowerCase().includes(filterText.toLowerCase()) })
          .map((goose) => { return (
            <Goose key={ goose.id } name={ goose.name } id={ goose.id } aggression={ goose.aggression } onDelete={ () => { deleteGoose(goose.id) } } />
          )}) }
      <AddGooseForm onAddGoose={ onAddGoose } setMsg={setMsg}/>
    </div>
  );
}

export default App;
