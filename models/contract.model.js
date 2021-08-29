const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const contractSchema = new mongoose.Schema(
    {
        fristPartyId: {
            type: String,
            trim: true,
            required: true,
        },
        secondPartyId: {
            type: String,
            trim: true,
            required: true,
        },
        termsOfContract: [
            {
                termOfContract: {
                    termType: {
                        type: String,
                        trim: true,
                        min: 5,
                    },
                    termDetails: {
                        type: String,
                        trim: true,
                        min: 20,
                    }
                }
            }
        ],
        qrCode: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const Contract = mongoose.model("Contract", contractSchema);

module.exports = Contract;
