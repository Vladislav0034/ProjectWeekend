import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

import CardsWrapper from '../ui/CardsWrapper';
import axiosInstance from '../api/axiosInstance';

export default function MainPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axiosInstance.get('/').then((res) => setCards(res.data));
  }, []);

  return (
    <Row>
    <CardsWrapper cards={cards} user={user} />
  </Row>
  );
}