const RandomListingsHandler = async (req, res, next) => {
  const { count, where, locale, depth } = req.query;

  if (!count) {
    return res.status(404).json({ error: "Count not specified" });
  }

  // Query the Listings model to retrieve random listings
  const randomListings = await req.payload.db.collections["listings"].aggregate(
    [{ $sample: { size: Number(count) } }, { $project: { _id: 1 } }]
  );

  // Extract the IDs of the randomly selected listings
  const ids = randomListings.map((listing) => listing._id);

  // Construct the where clause
  const additionalConditions = where ? { ...where } : null; // Keep it null if no additional conditions

  const query = {
    collection: "listings",
    locale: locale,
    depth: depth,
    where: additionalConditions
      ? { and: [{ id: { in: ids } }, additionalConditions] }
      : { id: { in: ids } }, // Only include the id filter if no additional conditions
  };

  const listings = await req.payload.find(query);

  return res.status(200).json(listings);
};

module.exports = { RandomListingsHandler };
