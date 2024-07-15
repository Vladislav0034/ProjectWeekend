import Row from 'react-bootstrap/esm/Row';
import PostCard from "./PostCard";

export default function CardsWrapper({ cards, user, deleteHandler, showDeleteButton, incrementBonus, decrementBonus, editHandler}) {
    return (
      <Row className="mt-3">
        {cards.map((card) => (
          <PostCard
            key={card.id}
            card={card}
            user={user}
            deleteHandler={deleteHandler}
            showDeleteButton={showDeleteButton}
            incrementBonus={incrementBonus}
            decrementBonus={decrementBonus}
            editHandler={editHandler}
          />
        ))}
      </Row>
    );
  }
  