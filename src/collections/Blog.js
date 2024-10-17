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
          const secretToken = process.env.PAYLOAD_REVALIDATION_SECRET; // Replace with your actual secret token
          const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&id=${doc.id}&collection=blog`;

          try {
            const response = await fetch(url, { method: "GET" });
            console.log(response);
          } catch (error) {
            console.error("Error during revalidation:", error);
          }
        }
      },
    ],
    afterDelete: [
      async ({
        doc, // full document data
        req, // full express request
        previousDoc, // document data before updating the collection
        operation, // name of the operation ie. 'create', 'update'
      }) => {
        const secretToken = process.env.PAYLOAD_REVALIDATION_SECRET; // Replace with your actual secret token
        const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&id=${doc.id}&collection=blog`;

        try {
          const response = await fetch(url, { method: "GET" });
          console.log(response);
        } catch (error) {
          console.error("Error during revalidation:", error);
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
