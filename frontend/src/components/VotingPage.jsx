import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VotingPage = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("");
  const [voted, setVoted] = useState(false);

  const voterName = sessionStorage.getItem("voterName");

  // Redirect to login if name not set
  useEffect(() => {
    if (!voterName) {
      navigate("/");
    }
  }, [voterName, navigate]);

  const handleVote = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    try {
      // Call backend to save vote
      await axios.post("http://localhost:4567/api/vote", {
        name: voterName,
        option: selectedOption,
      });

      setVoted(true);

      // Redirect to results after 1 second
      setTimeout(() => {
        navigate("/results");
      }, 1000);
    } catch (error) {
      console.log("Vote error:", error);
      alert("Something went wrong while voting");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Voting Page</h2>
      {!voted ? (
        <form onSubmit={handleVote}>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              value="Option A"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label className="form-check-label">Option A</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              value="Option B"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label className="form-check-label">Option B</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="option"
              value="Option C"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            <label className="form-check-label">Option C</label>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit Vote
          </button>
        </form>
      ) : (
        <h4>Thanks for voting! Redirecting to results...</h4>
      )}
    </div>
  );
};

export default VotingPage;
