import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import axios from 'axios';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';

const StudentTable = (props) => {
  const { _id, fullName, roll, age, stclass, hall, status } = props.student;
  return (
    <tr className="text-center">
      <td>
        <input
          onChange={props.onCheckValues}
          className="form-check-input"
          type="checkbox"
          value={_id}
        />
      </td>
      <td>{fullName}</td>
      <td>{stclass}</td>
      <td>{roll}</td>
      <td>{age}</td>
      <td>{hall}</td>
      <td>
        {status === 'active' ? (
          <span className="badge bg-success">Active</span>
        ) : (
          <>
            <span className="badge bg-danger me-2">In active</span>
            <span
              onClick={() => console.log('hello')}
              className="badge bg-warning"
              style={{ cursor: ' pointer' }}
            >
              Make Active
            </span>
          </>
        )}
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm me-2 my-1"
        >
          Edit
        </button>
        <button
          onClick={() => props.handleSingleDelete(_id)}
          type="button"
          className="btn btn-outline-danger btn-sm my-1"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const ShowStudents = () => {
  const [allStudents, setAllStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const size = 5;

  const [checkedStudents, setCheckedStudents] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/students?page=${curPage}&&size=${size}`)
      .then((res) => {
        setAllStudents(res.data.result);
        setPageCount(Math.ceil(res.data.count / size));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [curPage, deleteStatus]);

  const onCheckValues = (e) => {
    if (e.target.checked) {
      setCheckedStudents((checkedStudents) => [
        ...checkedStudents,
        e.target.value,
      ]);
    } else {
      const filterChecked = checkedStudents.filter(
        (st) => st !== e.target.value,
      );
      setCheckedStudents(filterChecked);
    }
  };

  const handleMultpleDelete = () => {};

  const handleSingleDelete = (id) => {
    console.log(id);
    setIsLoading(true);
    axios
      .delete(`http://localhost:5000/students/${id}`)
      .then((res) => {
        if (res.data.deletedCount === 1) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AdminPageLayout pageTitle={'Show all students'}>
      {isLoading && <Preloader />}
      {allStudents.length > 0 ? (
        <>
          <button
            type="button"
            onClick={handleMultpleDelete}
            className={`btn btn-danger my-2 ${
              checkedStudents.length <= 0 && 'disabled'
            }`}
          >
            Delete Selected
          </button>

          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>#</th>
                <th>Name</th>
                <th>Class</th>
                <th>Roll</th>
                <th>Age</th>
                <th>Hall</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <StudentTable
                  key={student._id}
                  index={index}
                  student={student}
                  onCheckValues={onCheckValues}
                  handleSingleDelete={handleSingleDelete}
                />
              ))}
            </tbody>
          </Table>

          <ul className="pagination pagination-md">
            {[...Array(pageCount).keys()].map((number) => (
              <li
                key={number}
                className={`page-item ${number === curPage && 'active'}`}
                onClick={() => setCurPage(number)}
              >
                <Link className="page-link" to="#">
                  {number + 1}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Alert variant="secondary">There is no item to show!</Alert>
      )}
    </AdminPageLayout>
  );
};

export default ShowStudents;
