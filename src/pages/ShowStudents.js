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
          value={[_id, status]}
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
          <span className="badge bg-danger me-2">In active</span>
        )}
      </td>
      <td>
        <Link to={`/show-students/${_id}`}>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2 my-1"
          >
            Edit
          </button>
        </Link>
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

  let checkedIds = [];
  if (checkedStudents.length > 0) {
    checkedStudents.forEach((st) => {
      let newArr = st.split(',');
      if (checkedIds.indexOf(newArr[0]) === -1) {
        checkedIds.push(newArr[0]);
      }
    });
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://aqueous-reef-45630.herokuapp.com/students?page=${curPage}&&size=${size}`,
      )
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
        (st) => st.split(',')[1] !== e.target.value.split(',')[1],
      );
      setCheckedStudents(filterChecked);
    }
  };

  const handleMultpleDelete = () => {
    setIsLoading(true);
    axios
      .post('https://aqueous-reef-45630.herokuapp.com/multi', checkedIds)
      .then((res) => {
        if (res.status === 200) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setCheckedStudents([]);
        checkedIds = [];
      });
  };

  const handleSingleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://aqueous-reef-45630.herokuapp.com/students/${id}`)
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

  const handleStatus = () => {
    console.log('Checked Students:', checkedStudents);
    axios
      .post('https://aqueous-reef-45630.herokuapp.com/status', checkedStudents)
      .then((res) => {
        if (res.status === 200) {
          setDeleteStatus(!deleteStatus);
          setIsLoading(false);
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setCheckedStudents([]);
        checkedIds = [];
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
            className={`btn btn-danger my-2 me-1 ${
              checkedStudents.length <= 0 && 'disabled'
            }`}
          >
            Delete Selected
          </button>
          <button
            type="button"
            onClick={handleStatus}
            className={`btn btn-warning my-2 ms-1 ${
              checkedStudents.length <= 0 && 'disabled'
            }`}
          >
            Change Status
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
