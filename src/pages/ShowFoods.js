import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import AdminPageLayout from '../components/layout/AdminPageLayout';
import axios from 'axios';
import Preloader from '../components/Preloader';

// const allFoods = [
//   { id: 1, name: 'Alu vorta', price: '10' },
//   { id: 2, name: 'Kichuri', price: '80' },
//   { id: 3, name: 'Singara', price: '10' },
//   { id: 4, name: 'Shutki', price: '30' },
//   { id: 5, name: 'Rui Fish', price: '60' },
//   { id: 6, name: 'Chicken', price: '120' },
//   { id: 7, name: 'Beef', price: '150' },
//   { id: 8, name: 'Biriyani', price: '220' },
//   { id: 9, name: 'Coca Cola', price: '20' },
// ];

const FoodTable = (props) => {
  const { foodName, foodPrice } = props.food;
  return (
    <tr>
      <td>{props.index + 1}</td>
      <td>{foodName}</td>
      <td>{foodPrice}</td>
    </tr>
  );
};

const ShowFoods = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('http://localhost:5000/foods')
      .then((res) => {
        setAllFoods(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <AdminPageLayout pageTitle={'Show all Foods'}>
      {isLoading && <Preloader />}
      {allFoods.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
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
      ) : (
        <Alert variant="secondary">There is no item to show!</Alert>
      )}
    </AdminPageLayout>
  );
};

export default ShowFoods;
