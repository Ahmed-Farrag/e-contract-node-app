const mongoose = require("mongoose");

const contractSchema = new mongoose.Schema(
    {
        fristPartyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            requird: true,
        },
        secondPartyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            requird: true,
        },
        termsOfContract: [{ type: mongoose.Schema.Types.ObjectId, ref: "TermsOfContract", requird: true }],
        qrCode: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
        archive: {
            type: Boolean,
        }
    },
    { timestamps: true },
);

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract
