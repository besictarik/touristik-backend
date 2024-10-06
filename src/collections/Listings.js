const Listings = {
  slug: "listings",
  labels: {
    singular: "Listing",
    plural: "Listings",
  },
  fields: [
    {
      name: "photos",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "photo",
          type: "upload",
          relationTo: "photos",
          required: true,
        },
      ],
    },
    {
      name: "tag",
      type: "text",
      label: "Tag",
      localized: true,
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      required: true,
    },
    {
      name: "name",
      type: "text",
      label: "Name",
      required: true,
      localized: true,
    },
    {
      name: "rooms",
      type: "number",
      label: "Rooms",
      required: true,
    },
    {
      name: "bathrooms",
      type: "number",
      label: "Bathrooms",
      required: true,
    },
    {
      name: "people",
      type: "number",
      label: "People",
      required: true,
    },
    {
      name: "highlightedAmmenities",
      type: "array",
      required: true,
      minRows: 3,
      maxRows: 3,
      fields: [
        {
          name: "highlightedAmmenity",
          type: "relationship",
          relationTo: "ammenity-items",
          required: true,
        },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      required: true,
      localized: true,
    },
    {
      name: "listingHighlights",
      type: "array",
      fields: [
        {
          name: "icon",
          type: "relationship",
          relationTo: "icons",
          required: true,
        },
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
      ],
    },
    {
      name: "sleepingArrangement",
      type: "array",
      required: true,
      fields: [
        {
          name: "icons",
          type: "array",
          minRows: 1,
          required: true,
          fields: [
            {
              name: "icon",
              type: "relationship",
              relationTo: "icons",
              required: true,
            },
          ],
        },
        {
          name: "bed",
          label: "Bed",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "room",
          label: "Room",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "ammenityCards",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "ammenityCardTitle",
          label: "Title",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "ammenityItems",
          type: "array",
          minRows: 1,
          required: true,
          fields: [
            {
              name: "ammenityItem",
              type: "relationship",
              relationTo: "ammenity-items",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "availability",
      type: "text",
      label: "iCal link",
      required: true,
    },
    {
      name: "pricing",
      type: "array",
      required: true,
      fields: [
        {
          name: "periodName",
          label: "Period Name",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "period",
          label: "Period",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "price",
          label: "Price",
          type: "number",
          required: true,
        },
        {
          name: "priceType",
          type: "radio",
          required: true,
          options: [
            {
              label: "Night",
              value: "night",
            },
            {
              label: "Week",
              value: "week",
            },
          ],
          defaultValue: "night",
          admin: {
            layout: "horizontal",
          },
        },
      ],
    },
    {
      name: "locationCoordinates",
      type: "point",
      required: true,
    },
    {
      name: "locationItems",
      type: "array",
      required: true,
      minRows: 1,
      fields: [
        {
          name: "icon",
          type: "relationship",
          relationTo: "icons",
          required: true,
        },
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: "policies",
      type: "array",
      required: true,
      fields: [
        {
          name: "icon",
          type: "relationship",
          relationTo: "icons",
          required: true,
        },
        {
          name: "text",
          label: "Text",
          type: "text",
          required: true,
          localized: true,
        },
      ],
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
        if (doc._status === "published") {
          const secretToken = "antemate"; // Replace with your actual secret token
          const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&id=${doc.id}&collection=listings`;

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
        const secretToken = "antemate"; // Replace with your actual secret token
        const url = `${process.env.BASE_URL}/api/revalidate?secret=${secretToken}&id=${doc.id}&collection=listings`;

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
    useAsTitle: "name",
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

module.exports = Listings;
