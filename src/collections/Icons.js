const Icons = {
    slug: "icons",
    labels: {
        singular: "Icon",
        plural: "Icons",
    },
    upload: {
        adminThumbnail: "filePath",
        mimeTypes: ["image/png", "image/svg+xml"],
        staticDir: "./media/icons",
    },
    fields: [
        {
            name: "iconName",
            label: "Icon name",
            type: "text",
            required: true,
        },
        {
            name: "altAttribute",
            label: "Alt attribute",
            type: "text",
            required: true,
            localized: true,
        },
    ],
    admin: {
        useAsTitle: "iconName",
    },
    access: {
        read: () => true,
    },
};

module.exports = Icons;
