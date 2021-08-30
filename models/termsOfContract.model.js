const mongoose = require("mongoose");
const termsOfContractSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contract",
            requird: true
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
                        max: 100,
                    }
                }
            }
        ],

    },
    { timestamps: true },
)

const termsOfContract = mongoose.model("termsOfContract", termsOfContractSchema)

module.exports = termsOfContract