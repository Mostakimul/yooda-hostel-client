import React, { useEffect, useState } from 'react';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditFood = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();

  const [food, setFood] = useState({});

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://aqueous-reef-45630.herokuapp.com/foods/${id}`)
      .then((res) => {
        setFood(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  const onSubmit = (data) => {
    setIsLoading(true);
    axios
      .put(`https://aqueous-reef-45630.herokuapp.com/foods/${id}`, data)
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
    <AdminPageLayout pageTitle={'Edit Food'}>
      {!!isSuccess && (
        <Alert variant="success">Food Updated Successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="foodName">
          <Form.Label>Food Name</Form.Label>
          <Form.Control
            type="text"
            {...register('foodName', { required: true })}
            defaultValue={food?.foodName}
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
            defaultValue={food?.foodPrice}
            placeholder="Food Price"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.foodPrice && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Update Food
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Update Food
          </Button>
        )}
      </Form>
    </AdminPageLayout>
  );
};

export default EditFood;
