const AboutUs = require("../collections/AboutUs.js");
const BigVillaLeft = require("../collections/BigVillaLeft.js");
const BigVillaRight = require("../collections/BigVillaRight.js");
const Destinations = require("../collections/Destinations.js");
const SuperLuxurious = require("../collections/SuperLuxurious.js");
const VillasLeft = require("../collections/VillasLeft.js");
const VillasRight = require("../collections/VillasRight.js");

const Index = {
    slug: "index",
    fields: [
        {
            name: "listings",
            type: "array",
            required: true,
            maxRows: 8,
            fields: [
                {
                    name: "listing",
                    type: "relationship",
                    relationTo: "listings", // "pages" is the slug of an existing collection
                    required: true,
                },
            ],
        },
        {
            name: "blocks",
            type: "blocks",
            required: true,
            blocks: [
                VillasRight,
                VillasLeft,
                Destinations,
                AboutUs,
                SuperLuxurious,
                BigVillaLeft,
                BigVillaRight,
            ],
        },
    ],
    hooks: {
        afterChange: [
            async ({
                doc, // full document data
                req, // full express request
                previousDoc, // document data before updating the collection
                operation, // name of the operation ie. 'create', 'update'
            }) => {
                // Might be corrected, T
                const secretToken = "antemate"; // Replace with your actual secret token
                const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&id=noId&collection=index`;

                try {
                    const response = await fetch(url, { method: "GET" });
                    console.log(response);
                } catch (error) {
                    console.error("Error during revalidation:", error);
                }
            },
        ],
    },
    access: {
        read: () => true,
    },
};

module.exports = Index;
