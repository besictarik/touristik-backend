const Destinations = {
    slug: "destinations",
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
            name: "destinationsList",
            label: "Destinations",
            type: "array",
            required: true,
            fields: [
                {
                    name: "photo",
                    label: "Photo",
                    type: "relationship",
                    relationTo: "photos",
                    required: true,
                },
                {
                    name: "location",
                    label: "Location",
                    type: "text",
                    required: true,
                    localized: true,
                },
                {
                    name: "link",
                    label: "Link",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
};

module.exports = Destinations;
