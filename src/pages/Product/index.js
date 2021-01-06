import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: "get_home",
      payload: {
        text: "hello there",
      },
    });
  }, [dispatch]);

  return (
    <div>
  
      this is home page
    </div>
  );
};

export default Home;
