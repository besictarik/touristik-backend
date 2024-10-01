const AboutUs = {
    slug: "about-us",
    fields: [
        {
            name: "title",
            label: "Title",
            type: "text",
            required: true,
        },
        {
            name: "paragraph",
            label: "Paragraph",
            type: "textarea",
            required: true,
        },
        {
            name: "employees",
            label: "Employees",
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
                    name: "employeeName",
                    label: "Employee name",
                    type: "text",
                    required: true,
                },
            ],
        },
    ],
};

module.exports = AboutUs;
