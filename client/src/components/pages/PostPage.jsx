import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import AppModal from '../ui/AppModal';
import axiosInstance from '../api/axiosInstance';
import CardsWrapper from '../ui/CardsWrapper';
import PostForm from '../ui/PostForm';

export default function PostPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/').then((res) => setCards(res.data));
  }, []);

  const cardSubmitHandler = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (!data.name || !data.city) return; // название колонок

    axiosInstance
      .post('/', data)
      .then((res) => {
        setCards((prev) => [res.data, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const incrementBonus = (id) => {
    axiosInstance
      .put(`/${id}/increment-bonus`)
      .then((res) => {
        setCards((prev) => prev.map((card) => (card.id === id ? res.data : card)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const decrementBonus = (id) => {
    axiosInstance
      .put(`/${id}/decrement-bonus`)
      .then((res) => {
        setCards((prev) => prev.map((card) => (card.id === id ? res.data : card)));
      })
      .catch((err) => {
        console.log(err);
      });
  };	

  const deleteHandler = (id) => {
    axiosInstance.delete(`/${id}`).then(() => {
      setCards((prev) => prev.filter((el) => el.id !== id));
    });
  };

  const editHandler = (id, updatedData) => {
    axiosInstance.put(`/${id}`, updatedData)
      .then((response) => {
        // Обновляем состояние карт после успешного обновления
        setCards((prev) => prev.map((card) => (card.id === id ? response.data : card)));
      })
      .catch((error) => {
        console.error("Ошибка при обновлении карточки:", error);
      });
  };


  return (
    <Row>
      {user.data && (
        <Col>
          <AppModal title="Создай пост братишка" buttonText="Создай">
            <PostForm cardSubmitHandler={cardSubmitHandler} />
          </AppModal>
        </Col>
      )}
        <CardsWrapper
        cards={cards}
        deleteHandler={deleteHandler}
        user={user}
        showDeleteButton={true}
        incrementBonus={incrementBonus}
        decrementBonus={decrementBonus}
        editHandler={editHandler}
      />
    </Row>
  );
}