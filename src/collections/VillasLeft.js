const VillasLeft = {
    slug: "villas-left",
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "subtitle",
            label: "Subtitle",
            type: "text",
            required: true,
            localized: true,
        },
        {
            name: "listings",
            label: "Listings",
            type: "array",
            required: true,
            maxRows: 5,
            fields: [
                {
                    name: "listing",
                    label: "Listing",
                    type: "relationship",
                    relationTo: "listings",
                },
            ],
        },
    ],
};

module.exports = VillasLeft;
