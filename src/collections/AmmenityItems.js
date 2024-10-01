const AmmenityItems = {
    slug: "ammenity-items",
    labels: {
        singular: "Ammenity item",
        plural: "Ammenity items",
    },
    fields: [
        {
            name: "icon",
            label: "Icon",
            type: "relationship",
            relationTo: "icons",
            required: true,
        },
        {
            name: "ammenity",
            label: "Ammenity",
            type: "text",
            required: true,
            localized: true,
        },
    ],
    admin: {
        useAsTitle: "ammenity",
    },
};

module.exports = AmmenityItems;
