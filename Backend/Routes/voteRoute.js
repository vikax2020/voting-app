import express from "express";
import { castVote, getAllVotes, getResults } from "../controllers/voteController.js";

const voteRoute = express.Router();

voteRoute.post("/vote", castVote);    // POST - cast vote
voteRoute.get("/votes", getAllVotes); // GET - all votes
voteRoute.get("/results", getResults); // GET - tally

export default voteRoute;
