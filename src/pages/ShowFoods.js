import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import axios from 'axios';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';

const FoodTable = (props) => {
  const { _id, foodName, foodPrice } = props.food;
  return (
    <tr className="text-center">
      <td>{foodName}</td>
      <td>{foodPrice}</td>
      <td>
        <Link to={`/edit-foods/${_id}`}>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm me-2 my-1"
          >
            Edit
          </button>
        </Link>
        <button
          onClick={() => props.handleDelete(_id)}
          type="button"
          className="btn btn-outline-danger btn-sm my-1"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const ShowFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const size = 5;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://aqueous-reef-45630.herokuapp.com/foods?page=${curPage}&&size=${size}`,
      )
      .then((res) => {
        setAllFoods(res.data.result);
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

  const handleDelete = (id) => {
    setIsLoading(true);
    axios
      .delete(`https://aqueous-reef-45630.herokuapp.com/food/${id}`)
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
    <AdminPageLayout pageTitle={'Show all Foods'}>
      {isLoading && <Preloader />}
      {allFoods.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allFoods.map((food, index) => (
                <FoodTable
                  key={food._id}
                  index={index}
                  food={food}
                  handleDelete={handleDelete}
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

export default ShowFoods;
