import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default function PostCard({
  card, user, deleteHandler, incrementBonus, decrementBonus, showDeleteButton, editHandler
}) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: card.name,
    city: card.city,
    country: card.country,
    time: card.time,
    image: card.image,
  });

  const handleViewDetails = () => {
    setShowModal(true);
    setEditMode(false);
  };

  const handleEditClick = () => {
    setShowModal(true);
    setEditMode(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editHandler(card.id, formData);
    setShowModal(false);
  };

  return (
    <>
      <Col md={4} className="mt-2 position-relative">
        <Card>
          <Card.Img variant="top" src={card.image} alt={`${card.name} image`} />
          <Card.Body>
            <h2 className="p-2">{card.name}</h2>
            <p className="p-2">Город: {card.city}</p>
            <p className="p-2">Стоимость: {card.money}</p>
            <p className="p-2">Страна: {card.country}</p>
            <div className="d-flex flex-row justify-content-end gap-2 p-2">
              <Button
                onClick={handleViewDetails}
                variant="outline-primary"
                className="mb-2"
              >
                Подробнее
              </Button>
              {showDeleteButton && user.data && user.data.id === card.userId && (
                <>
                  <Button
                    onClick={() => deleteHandler(card.id)}
                    variant="outline-danger"
                    className="mb-2"
                  >
                    Удалить
                  </Button>
                  <Button
                    onClick={handleEditClick}
                    variant="outline-warning"
                    className="mb-2"
                  >
                    Редактировать
                  </Button>
                </>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Редактировать Карточку' : 'Card Details'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editMode ? (
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCity">
                <Form.Label>Город</Form.Label>
                <Form.Control
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCountry">
                <Form.Label>Страна</Form.Label>
                <Form.Control
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTime">
                <Form.Label>Продолжительность</Form.Label>
                <Form.Control
                  name="time"
                  type="text"
                  value={formData.time}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Сохранить изменения
              </Button>
            </Form>
          ) : (
            <>
              <Card.Img variant="top" src={card.image} alt={`${card.name} image`} />
              <h2>{card.name}</h2>
              <p>City: {card.city}</p>
              <p>Money: {card.money}</p>
              <p>Страна: {card.country}</p>
              {/* доп инфу сюда */}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}