const Photos = {
    slug: "photos",
    labels: {
        singular: "Photo",
        plural: "Photos",
    },
    upload: {
        adminThumbnail: "filePath",
        mimeTypes: ["image/jpg", "image/jpeg", "image/webp"],
        staticDir: "./media/photos",
        formatOptions: { format: "webp", options: { quality: 75 } },
    },
    access: {
        read: () => true,
    },
};

module.exports = Photos;
