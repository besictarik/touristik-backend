const sendEmail = require("./hooks/sendEmail");

const Inquiries = {
    slug: "inquiries",
    fields: [
        {
            type: "row",
            fields: [
                {
                    type: "text",
                    name: "firstName",
                    admin: {
                        readOnly: true,
                    },
                },
                {
                    type: "text",
                    name: "lastName",
                    admin: {
                        readOnly: true,
                    },
                },
                {
                    type: "text",
                    name: "phoneNumber",
                    admin: {
                        readOnly: true,
                    },
                },
            ],
        },
        {
            type: "row",
            fields: [
                {
                    type: "text",
                    name: "emailAddress",
                    admin: {
                        readOnly: true,
                    },
                },
                {
                    type: "text",
                    name: "checkInDate",
                    admin: {
                        readOnly: true,
                    },
                },
                {
                    type: "text",
                    name: "checkOutDate",
                    admin: {
                        readOnly: true,
                    },
                },
                {
                    type: "text",
                    name: "guests",
                    admin: {
                        readOnly: true,
                    },
                },
            ],
        },
        {
            type: "textarea",
            name: "message",
            admin: {
                readOnly: true,
            },
        },
        {
            type: "text",
            name: "pagePath",
            admin: {
                readOnly: true,
            },
        },
    ],
    access: {
        create: () => true,
    },
    hooks: {
        afterOperation: [sendEmail],
    },
};

module.exports = Inquiries;
