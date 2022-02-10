import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const ServeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id, shift } = useParams();
  const location = useLocation();

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  const onSubmit = (data) => {
    data = {
      ...data,
      studentId: id,
      date: location.search.split('=')[1],
      shift: shift,
      status: true,
    };
    setIsLoading(true);
    axios
      .post(`http://localhost:5000/distribution-food`, data)
      .then((res) => {
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
    <AdminPageLayout pageTitle={'Serve Food'}>
      {!!isSuccess && <Alert variant="success">Student Food Served!</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Food Item */}
        <Form.Group className="mb-3" controlId="foodItemList">
          <Form.Label>Enter Food Items</Form.Label>
          <Form.Control
            type="textbox"
            {...register('foodItemList', { required: true })}
            placeholder="Enter food items"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodItemList && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Serve Student
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Serve Student
          </Button>
        )}
      </Form>
    </AdminPageLayout>
  );
};

export default ServeForm;
