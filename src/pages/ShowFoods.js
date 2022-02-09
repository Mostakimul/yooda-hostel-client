import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import axios from 'axios';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';

const FoodTable = (props) => {
  const { foodName, foodPrice } = props.food;
  return (
    <tr>
      <td>{foodName}</td>
      <td>{foodPrice}</td>
    </tr>
  );
};

const ShowFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const size = 5;

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/foods?page=${curPage}&&size=${size}`)
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
  }, [curPage]);

  return (
    <AdminPageLayout pageTitle={'Show all Foods'}>
      {isLoading && <Preloader />}
      {allFoods.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {allFoods.map((food, index) => (
                <FoodTable key={food._id} index={index} food={food} />
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
