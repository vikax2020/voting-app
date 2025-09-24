import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const voterName = sessionStorage.getItem("voterName");

  // Redirect to login if name not set
  useEffect(() => {
    if (!voterName) {
      navigate("/");
    }
  }, [voterName, navigate]);

  // Fetch results from backend
  const fetchResults = async () => {
    try {
      const res = await axios.get("http://localhost:4567/api/results");
      setResults(res.data.body);
    } catch (error) {
      console.log("Error fetching results:", error);
    }
  };

  // Auto-refresh every 5 seconds
  useEffect(() => {
    fetchResults(); // initial fetch
    const interval = setInterval(fetchResults, 5000); // fetch every 5s
    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="container mt-5">
      <h2>Voting Results</h2>
      {results.length === 0 ? (
        <p>No votes yet</p>
      ) : (
        <ul className="list-group">
          {results.map((r) => (
            <li key={r.option} className="list-group-item d-flex justify-content-between align-items-center">
              {r.option}
              <span className="badge bg-primary rounded-pill">{r.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;
