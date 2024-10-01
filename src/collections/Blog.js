const Blog = {
    slug: "blog",
    labels: {
        singular: "Blog post",
        plural: "Blog posts",
    },
    fields: [
        {
            name: "title",
            type: "text",
            label: "Title",
            required: true,
            localized: true,
        },
        {
            name: "photo",
            type: "relationship",
            relationTo: "photos",
            required: true,
        },
        {
            name: "hiddenPost",
            type: "checkbox",
            label: "Hide blog post",
            defaultValue: false,
        },
        {
            name: "content",
            type: "richText",
            label: "Content",
            required: true,
            localized: true,
        },
    ],
    admin: {
        useAsTitle: "title",
    },
    hooks: {
        afterChange: [
            async ({
                doc, // full document data
                req, // full express request
                previousDoc, // document data before updating the collection
                operation, // name of the operation ie. 'create', 'update'
            }) => {
                if (doc._status === "published") {
                    const secretToken = "antemate"; // Replace with your actual secret token
                    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?secret=${secretToken}&id=${doc.id}&collection=blog`;

                    try {
                        const response = await fetch(url, { method: "GET" });
                        console.log(response);
                    } catch (error) {
                        console.error("Error during revalidation:", error);
                    }

                    // Not sure if this should be here, T
                    const blogUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/revalidate?secret=${secretToken}&id=&collection=blog`;
                    try {
                        const response = await fetch(blogUrl, {
                            method: "GET",
                        });
                        console.log(response);
                    } catch (error) {
                        console.error("Error during revalidation:", error);
                    }
                }
            },
        ],
    },
    versions: {
        drafts: {
            autosave: true,
        },
    },
    access: {
        read: () => true,
    },
};

module.exports = Blog;
