import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setResults } from "../redux/searchSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Results() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state) => state.search.query);
  const results = useSelector((state) => state.search.results);

  useEffect(() => {
    if (!query) return;
    axios.get(`/api/details?q=${query}`)
      .then((res) => dispatch(
        setResults(res.data.places || [])
      ))
      .catch((err) => console.error(err));
  }, [query, dispatch]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="container mt-5">

      {results && results.length > 0 ? (
        <div className="row">
          {results.map((item, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 pointer">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">
                    {item.description}
                  </p>
                  <span className="badge bg-primary">{item.country}</span>
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

          />
          <a
            className="text-primary fs-5 text-decoration-none d-flex align-items-center mt-3 pointer"

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
