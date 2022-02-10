import React, { useEffect, useState } from 'react';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import { useForm } from 'react-hook-form';
import { Alert, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditStudent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { id } = useParams();

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [student, setStudent] = useState([]);

  useEffect(() => {
    setIsLoading(false);
    axios
      .get(`https://aqueous-reef-45630.herokuapp.com/students/${id}`)
      .then((res) => {
        setStudent(res.data);
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
      .put(`https://aqueous-reef-45630.herokuapp.com/students/${id}`, data)
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
    <AdminPageLayout pageTitle={'Add Student'}>
      {!!isSuccess && (
        <Alert variant="success">Student Updated Successfully!</Alert>
      )}
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        {/* defaultValue={props.firstName} */}
        <Form.Group className="mb-3" controlId="studentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            {...register('fullName', { required: true })}
            defaultValue={student.fullName}
            placeholder="Enter student name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Roll */}
        <Form.Group className="mb-3" controlId="studentRoll">
          <Form.Label>Roll</Form.Label>
          <Form.Control
            type="number"
            {...register('roll', { required: true })}
            defaultValue={student.roll}
            placeholder="Enter student roll"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.roll && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Age */}
        <Form.Group className="mb-3" controlId="studentAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            {...register('age', { required: true })}
            defaultValue={student.age}
            placeholder="Enter student age"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.age && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Class */}
        <Form.Group className="mb-3" controlId="studentClass">
          <Form.Label>Class</Form.Label>
          <Form.Control
            type="number"
            {...register('stclass', { required: true })}
            defaultValue={student.stclass}
            placeholder="Enter student class"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.stclass && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Hall */}
        <Form.Group className="mb-3" controlId="studentHall">
          <Form.Label>Hall</Form.Label>
          <Form.Control
            type="text"
            {...register('hall', { required: true })}
            defaultValue={student.hall}
            placeholder="Enter student hall"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.hall && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>
        {/* Status */}
        <Form.Group className="mb-3" controlId="studentStatus">
          <Form.Check
            type="radio"
            id="studentStatus"
            label="Active"
            value="active"
            {...register('status', { required: true })}
          />
          <Form.Check
            type="radio"
            id="studentStatus"
            label="In Active"
            value="inActive"
            {...register('status', { required: true })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.studentStatus && <span>This field is required</span>}
          </Form.Control.Feedback>
        </Form.Group>

        {isLoading ? (
          <Button variant="outline-primary" type="submit" disabled>
            Update Students
          </Button>
        ) : (
          <Button variant="outline-primary" type="submit">
            Update Student
          </Button>
        )}
      </Form>
    </AdminPageLayout>
  );
};

export default EditStudent;
