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
  hooks: {
    afterChange: [
      async ({
        doc, // full document data
        req, // full express request
        previousDoc, // document data before updating the collection
        operation, // name of the operation ie. 'create', 'update'
      }) => {
        const secretToken = "antemate"; // Replace with your actual secret token

        const listings = await req.payload.db.collections["listings"].find(
          {
            $or: [
              {
                "ammenityCards.ammenityItems.ammenityItem": doc.id,
              },
              {
                "highlightedAmmenities.highlightedAmmenity": doc.id,
              },
            ],
          }, // Use the regex for matching
          { projection: { _id: 1 } } // Only return the _id field
        );

        const ids = listings.map((listing) => listing._id);
        const idsString = ids.join(",");
        const encodedIds = encodeURIComponent(idsString);

        const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&listingIds=${encodedIds}&collection=ammenityItems`;

        try {
          const response = await fetch(url, { method: "GET" });
          console.log(response);
        } catch (error) {
          console.error("Error during revalidation:", error);
        }
      },
    ],
  },
  admin: {
    useAsTitle: "ammenity",
  },
};

module.exports = AmmenityItems;
