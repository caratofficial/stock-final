import { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

const supplierSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  }
});

let Supplier;
try {
  Supplier = model('Supplier');
} catch {
  Supplier = model('Supplier', supplierSchema);
}

export default function SupplierPage() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newSupplier = {
      name,
      address,
      phoneNumber
    };

    try {
      await axios.post(`${process.env.APIURL}/suppliers`, newSupplier);
      alert('Supplier saved successfully!');
      setName('');
      setAddress('');
      setPhoneNumber('');
    } catch (error) {
      console.log(error);
      alert('Error saving supplier!');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </Form.Group>

            <Button type="submit" class="btn btn-primary">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
