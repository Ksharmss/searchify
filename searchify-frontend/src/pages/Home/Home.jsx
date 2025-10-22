import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Home.css';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state) => state.search.query);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (query.trim().length > 0) {
      axios
        .get(`http://localhost:8000/api/search?q=${query}`)
        .then((res) => setSuggestions(res.data.results || []))
        .catch((err) => {
          console.error(err);
          setSuggestions([]);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // Clear suggestions on component mount
  useEffect(() => {
    setSuggestions([]);
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (query.trim()) navigate("/results");
  };

  const handleSelectSuggestion = (title) => {
    dispatch(setQuery(title));
    dispatch(setQuery("")); 
    setSuggestions([]);
    navigate("/results");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="position-relative" style={{ width: "400px" }} ref={dropdownRef}>
        <div className="input-group shadow rounded-pill overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search text-secondary"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 no-shadow-input"
            placeholder="Search here..."
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
          />
          <span
            className="input-group-text bg-white border-0"
            role="button"
            onClick={() => alert("Filter options coming soon!")}
          >
            <i className="bi bi-sliders text-secondary"></i>
          </span>
        </div>

        {/* Autocomplete Dropdown */}
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-100 mt-1 shadow">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelectSuggestion(item.title)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary px-4 rounded-pill"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
