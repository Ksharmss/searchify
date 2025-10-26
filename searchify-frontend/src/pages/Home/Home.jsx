import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "../../redux/searchSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Only call API if input length >= 3
    if (!inputValue || inputValue.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const controller = new AbortController();
    axios.get(`/api/search?q=${inputValue}`, { signal: controller.signal })
      .then(res => setSuggestions(res.data.results || []))
      .catch(err => { if (err.name !== 'CanceledError') console.error(err) });

    return () => controller.abort();
  }, [inputValue]);


  const handleSearch = () => {
    goToResults(inputValue); // pass whatever the user typed
  };

  const handleSelectSuggestion = (item) => {
    goToResults(item.country); // pass the selected item's country
  };

  const goToResults = (value) => {
    dispatch(setQuery(value.trim())); // update Redux query
    navigate("/results");             // go to results page
  };


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="position-relative w-400">
        <div className="input-group shadow rounded-pill overflow-hidden">
          <span className="input-group-text bg-white border-0">
            <i className="bi bi-search text-secondary"></i>
          </span>
          <input
            type="text"
            className="form-control border-0 no-shadow-input"
            placeholder="Search here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
                className="list-group-item list-group-item-action pointer"
                onClick={() => handleSelectSuggestion(item)}
              >
                {item.title} <small className="text-muted">({item.country} {item.flag})</small>
              </li>
            ))}
          </ul>
        )}
         <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary px-4 rounded-pill"
            onClick={handleSearch}
            disabled={inputValue.trim().length < 3} 
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
