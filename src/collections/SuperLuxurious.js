const SuperLuxurious = {
    slug: "super-luxurious",
    fields: [
        {
            name: "distinction",
            required: true,
            localized: true,
            label: "Distinction text",
            type: "text",
        },
        {
            name: "listing",
            label: "Listing",
            type: "relationship",
            relationTo: "listings",
        },
    ],
};

module.exports = SuperLuxurious;
