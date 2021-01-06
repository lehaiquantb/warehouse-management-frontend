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
      <Link to="/">home</Link>
      <Link to="/feed">feed</Link>
      this is home pagekk
    </div>
  );
};

export default Home;
