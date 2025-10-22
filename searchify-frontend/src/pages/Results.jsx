import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setResults } from '../redux/searchSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

function Results() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Initialize navigate
  const query = useSelector((state) => state.search.query);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    if (!query) return;
    axios
      .get(`http://localhost:8000/api/search?q=${query}`)
      .then((res) => dispatch(setResults(res.data.results || []))) // Make sure you pass array
      .catch((err) => console.error(err));
  }, [query, dispatch]);

  const handleClick = () => {
    navigate("/"); // <-- Works now
  };

  return (
    <div className="container mt-5">
      {results && results.length > 0 ? (
        <div className="row">
          {results.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100" style={{ cursor: "pointer" }}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "150px", objectFit: "fill" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text" style={{ fontSize: "12px" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-5 d-flex flex-column justify-content-center align-items-center">
          <img
            src="/no-data-found.png"
            alt="No Results Found"
            className="img-fluid"
            style={{ maxWidth: "300px" }}
          />
          <a
            className="text-primary fs-5 text-decoration-none d-flex align-items-center mt-3"
            style={{ cursor: "pointer" }}
            onClick={handleClick}
          >
            <i className="bi bi-arrow-left me-2"></i>
            Go Back
          </a>
        </div>
      )}
    </div>
  );
}

export default Results;
