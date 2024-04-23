import "./Card.scss";

const Card = ({ dashboardView, cardData, listResponse, onAddToFavorites, removeFromFavorites }) => {

  const favedIds = listResponse.map(e => e.id);
  const Button = ({ item }) => !dashboardView && (!(favedIds.includes(item.id)) ?
    <button className="cards__addBtn" onClick={() => onAddToFavorites(item)}>Add to favorites</button> :
    <button className="cards__removeBtn" onClick={() => removeFromFavorites(item)}>Remove from favorites</button>);

  return (
    <div className="cards">
      {cardData.length > 0 && cardData.map(item =>
        <div className="cards__container" key={item.id}>
          <div className='cards__content'>
            <div className="cards__logo">
              <img className='image' src={item.url} alt={item.thumbnailUrl} />
            </div>
            <div className="cards__data">
              <p>{item.id}. {item.title}</p>
            </div>
          </div>
          <Button item={item} />
        </div>
      )}

    </div>
  );
}

export default Card;