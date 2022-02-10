import React, { useEffect, useState } from 'react';
import { Alert, Form, Table } from 'react-bootstrap';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Preloader from '../components/Preloader';

const DistributeFood = () => {
  const [filterStudent, setFilterStudent] = useState(null);
  const [students, setStudents] = useState([]);

  // loading and success state
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://aqueous-reef-45630.herokuapp.com/students')
      .then((res) => {
        setStudents(res.data.result);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSubmit = (data) => {
    const { searchRoll, date, shift } = data;

    const filterId = students.find((st) => st.roll === searchRoll);

    if (!filterId) {
      setMsg('No matching roll found!');
      return;
    }
    data = {
      date: new Date(date).toLocaleDateString(),
      shift: shift,
      id: filterId._id,
    };
    axios
      .post('https://aqueous-reef-45630.herokuapp.com/distribution', data)
      .then((res) => {
        if (res.data) {
          let resStuId = res.data.studentId;
          let findStudent = students.find((stu) => stu._id === resStuId);
          let studentDetails = {
            id: res.data._id,
            studentId: res.data.studentId,
            fullName: findStudent.fullName,
            hall: findStudent.hall,
            shift: res.data.shift,
            date: res.data.date,
            status: res.data.status,
          };
          setFilterStudent(studentDetails);
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        setFilterStudent({
          studentId: data.id,
          fullName: filterId.fullName,
          hall: filterId.hall,
          shift: data.shift,
          date: data.date,
        });
      })
      .finally(() => {
        setIsLoading(false);
        reset({});
      });
    setMsg(null);
  };

  const { register, handleSubmit, reset } = useForm();

  return (
    <AdminPageLayout pageTitle={'Serve Food'}>
      {isLoading && <Preloader />}
      <Form onSubmit={handleSubmit(onSubmit)} className="input-group mb-3">
        <input
          type="text"
          className="form-control form-control-md"
          placeholder="Enter student roll"
          {...register('searchRoll', { required: true })}
        />

        <select
          className="form-select mx-2"
          {...register('shift', { required: true })}
        >
          <option selected defaultValue="">
            Select Shift
          </option>
          <option value="morning">Morning</option>
          <option value="day">Day</option>
          <option value="night">Night</option>
        </select>

        <input
          type="date"
          className="form-control form-control-md me-2"
          {...register('date', { required: true })}
        />

        <button type="submit" className="input-group-text btn-success">
          Search
        </button>
      </Form>
      {msg && <p>{msg}</p>}
      {!!filterStudent ? (
        <Table striped bordered hover>
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Hall</th>
              <th>Shift</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td>{filterStudent?.fullName}</td>
              <td>{filterStudent?.hall}</td>
              <td>{filterStudent?.shift}</td>
              <td>{filterStudent?.date}</td>
              <td>
                {!!filterStudent?.status ? (
                  <span className="badge bg-success me-2">Already served!</span>
                ) : (
                  <span className="badge bg-danger me-2">Not Served</span>
                )}
              </td>
              <td>
                {!!filterStudent?.status ? (
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm my-1"
                    disabled
                  >
                    Already Served
                  </button>
                ) : (
                  <Link
                    to={`/serve-students/${filterStudent.studentId}/${filterStudent.shift}?date=${filterStudent.date}`}
                  >
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm my-1"
                    >
                      Serve
                    </button>
                  </Link>
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Alert className="my-3" variant="secondary">
          Nothing to show!
        </Alert>
      )}
    </AdminPageLayout>
  );
};

export default DistributeFood;
