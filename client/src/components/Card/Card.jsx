import React from 'react';
import { Link } from 'react-router-dom';
import style from "./Card.module.css";

const Card = (props) => {
  return(
    <Link to={`detail/${props.id}`} className={style.cardLink}>
        
    <div className={style.card}>
      <img src={props.image} alt={props.name} />
      <p>
      <p><strong><u>{props.name.toUpperCase()}</u></strong></p>
      </p>
      <div className={style.genreContainer}>
     </div>
     <div className={style.genreTagsContainer}>
  <div className={style.genreTags} style={{ whiteSpace: 'pre-line', maxHeight: '4em', overflowY: 'scroll' }}>
    {props.temps.join('\n')}
  </div>
</div>
     



      <p>Weight: {props.weight}</p>
    </div>
      </Link>
  )
}

export default Card;

