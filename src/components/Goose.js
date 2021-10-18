import React from 'react'
import '../styles/Goose.css'

const Goose = (props) => {
  return (
    <div className="goose">
      <div className="delete-btn" onClick={ props.onDelete }>Delete</div>
      <div className="pic-and-labels">
        <img src="https://www.vhv.rs/dpng/d/423-4238943_untitled-goose-game-transparent-png-png-download.png" alt="pro pic" />
        <div>
          <span className="name">{props.name}</span>
          <span className="id">ID: {props.id}</span>
          <span className="aggression">Aggression: {props.aggression}</span>
        </div>
      </div>
    </div>
  )
}

export default Goose
