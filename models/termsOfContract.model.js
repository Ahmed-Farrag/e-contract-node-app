const mongoose = require("mongoose");
const termsOfContractSchema = new mongoose.Schema(
    {
        contractId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract",
            requird: true
        },
        term: {
            type: String,
            requird: true,
            trim: true,
        },
        termContent: {
            type: String,
            requird: true,
            trim: true,
        },
        requestedUpdates: {
            term: {
                type: String,
                trim: true,
            },
            termContent: {
                type: String,
                trim: true,
            }
        },
    },
    { timestamps: true },
)

const TermsOfContract = mongoose.model("termsOfContract", termsOfContractSchema)
module.exports = TermsOfContract
