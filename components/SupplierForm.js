import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import mongoose from 'mongoose';

const uri = 'mongodb+srv://user1:0qVKnMYLcxmQ4id7@cluster0.yx0cyuu.mongodb.net/suppliers?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));
  
const supplierSchema = new mongoose.Schema({
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

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const supplier = new Supplier({ name, address, phoneNumber });

    try {
      await supplier.save();
      alert('Supplier saved successfully!');
      setName('');
      setAddress('');
      setPhoneNumber('');
    } catch (err) {
      console.error(err);
      alert('An error occurred while saving the supplier');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Supplier Name</Form.Label>
        <Form.Control type="text" placeholder="Enter supplier name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Save
      </Button>
    </Form>
  );
};

export default SupplierForm;
