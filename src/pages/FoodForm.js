import React, { useState } from 'react';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const FoodForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .post('http://localhost:5000/foods', data)
      .then((res) => {
        console.log(res);
        if (res.data.acknowledged === true) {
          setIsLoading(false);
          setIsSuccess(true);
          reset({});
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AdminPageLayout pageTitle={'Add Food'}>
      {!!isSuccess && <Alert variant="success">Food Added Successfully!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="foodName">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            {...register('foodName', { required: true })}
            placeholder="Enter food name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodName && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="foodPrice">
          <Form.Label>Food Price</Form.Label>
          <Form.Control
            type="text"
            {...register('foodPrice', { required: true })}
            placeholder="Food Price"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodPrice && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Add Food
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Add Food
          </Button>
        )}
      </Form>
    </AdminPageLayout>
  );
};

export default FoodForm;
