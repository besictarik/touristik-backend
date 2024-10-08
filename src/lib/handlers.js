const { generateCroatianRegex, normalizeString } = require("./utils");
const ListingsSearchHandler = async (req, res, next) => {
  const { where } = req.query;

  if (!where || !where.and) return next();

  // Find the index of the location condition
  const locationIndex = where?.and?.findIndex(
    (condition) => condition.location
  );

  if (locationIndex === -1) return next(); // No location condition, proceed

  // Extract the location condition and normalize it
  const locationCondition = where.and[locationIndex].location.contains;
  where.and.splice(locationIndex, 1); // Remove the location condition

  // Normalize the location for searching
  const normalizedLocation = normalizeString(locationCondition);

  // Create a regex for partial matching
  const regex = generateCroatianRegex(normalizedLocation);

  // Directly query the Listings model, projecting only the _id field
  const listings = await req.payload.db.collections["listings"].find(
    { location: { $regex: regex } }, // Use the regex for matching
    { projection: { _id: 1 } } // Only return the _id field
  );

  // Extract IDs from matched listings
  const ids = listings.map((listing) => listing._id);

  req.query.where = {
    and: [{ id: { in: ids } }, ...where.and],
  };
  next();
};

module.exports = { ListingsSearchHandler };
