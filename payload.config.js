const { buildConfig } = require("payload/config");
const { mongooseAdapter } = require("@payloadcms/db-mongodb");
const { webpackBundler } = require("@payloadcms/bundler-webpack");
const { slateEditor } = require("@payloadcms/richtext-slate");

const Listing = require("./src/collections/Listings.js");
const Photos = require("./src/collections/Photos.js");
const Icons = require("./src/collections/Icons.js");
const AmmenityItems = require("./src/collections/AmmenityItems.js");
const Admins = require("./src/collections/Admins.js");
const Blog = require("./src/collections/Blog.js");
const Inquiries = require("./src/collections/Inquiries/index.js");

const Index = require("./src/globals/Index.js");

const path = require("path");

const mockModulePath = path.resolve(__dirname, "src/Empty.js");
const fullFilePath = path.resolve(
    __dirname,
    "src/collections/Inquiries/hooks/sendEmail"
);

module.exports = buildConfig({
    admin: {
        bundler: webpackBundler(),
        webpack: (config) => {
            return {
                ...config,
                resolve: {
                    ...config.resolve,
                    alias: {
                        ...config.resolve.alias,
                        [fullFilePath]: mockModulePath,
                    },
                },
            };
        },
    },
    editor: slateEditor({
        admin: {
            elements: [
                "h2",
                "h3",
                "link",
                "ul",
                "upload",
                // customize elements allowed in Slate editor here
            ],
            leaves: [
                "bold",
                "italic",
                "underline",
                // customize leaves allowed in Slate editor here
            ],
        },
    }),
    db: mongooseAdapter({
        url: process.env.DATABASE_URI,
    }),
    collections: [
        Listing,
        Photos,
        Icons,
        AmmenityItems,
        Admins,
        Blog,
        Inquiries,
    ],
    globals: [Index],
    localization: {
        locales: ["en", "hr", "de"],
        defaultLocale: "en",
        fallback: true,
    },
    cors: "*",
});
