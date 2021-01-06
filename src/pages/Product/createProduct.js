import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const ProductDetail = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: 'get_home',
      payload: {
        text: 'hello there',
      },
    });
  }, [dispatch]);

  return <div>pp</div>;
};

export default ProductDetail;
