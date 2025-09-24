import voteModel from "../models/votemodel.js";

// ✅ Cast a new vote
export const castVote = async (req, res) => {
    console.log("Vote received at backend:", req.body);

    try {
        const { name, option } = req.body;

        // 1. Check if this user has already voted (optional, based on name)
        const existingVote = await voteModel.findOne({ name });
        if (existingVote) {
            return res.json({
                success: false,
                status: 400,
                message: "User has already voted",
                body: existingVote
            });
        }

        // 2. Save new vote
        const newVote = await voteModel.create({ name, option });

        return res.json({
            success: true,
            status: 200,
            message: "Vote cast successfully",
            body: newVote
        });

    } catch (error) {
        console.log(error, "castVote error");
        return res.json({
            success: false,
            status: 500,
            message: "Error casting vote",
            body: {}
        });
    }
};

// ✅ Get all votes (optional — mainly for admin/debug)
export const getAllVotes = async (req, res) => {
    try {
        const votes = await voteModel.find();

        return res.json({
            success: true,
            status: 200,
            message: "All votes fetched successfully",
            body: votes
        });

    } catch (error) {
        console.log(error, "getAllVotes error");
        return res.json({
            success: false,
            status: 500,
            message: "Error fetching votes",
            body: {}
        });
    }
};

// ✅ Get results (tally counts per option)
export const getResults = async (req, res) => {
    try {
        // Aggregate counts grouped by option
        const results = await voteModel.aggregate([
            { $group: { _id: "$option", count: { $sum: 1 } } }
        ]);

        // Convert to nice format
        const formattedResults = results.map(r => ({
            option: r._id,
            count: r.count
        }));

        return res.json({
            success: true,
            status: 200,
            message: "Results fetched successfully",
            body: formattedResults
        });

    } catch (error) {
        console.log(error, "getResults error");
        return res.json({
            success: false,
            status: 500,
            message: "Error fetching results",
            body: {}
        });
    }
};
