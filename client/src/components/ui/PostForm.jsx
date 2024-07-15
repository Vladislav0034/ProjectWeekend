import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function PostForm({ cardSubmitHandler }) {
  return (
    <Form onSubmit={cardSubmitHandler}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Enter name" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formcity">
        <Form.Label>Город</Form.Label>
        <Form.Control name="city" type="text" placeholder="Enter city" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formcountry">
        <Form.Label>Страна</Form.Label>
        <Form.Control name="country" type="text" placeholder="Enter country" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formtime">
        <Form.Label>Продолжительность</Form.Label>
        <Form.Control name="time" type="text" placeholder="Enter time" /> 
      </Form.Group>
      <Form.Group className="mb-3" controlId="formImage">
        <Form.Label>Image URL</Form.Label>
        <Form.Control name="image" type="text" placeholder="Enter image URL" />
      </Form.Group>
      <Button variant="outline-primary" type="submit">
        Создать карточку
      </Button>
    </Form>
  );
}