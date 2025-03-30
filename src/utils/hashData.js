const { createHash } = require("crypto");

const generateHash = (data) => {
  const hash = createHash("sha256");
  return hash.update(data).digest("hex");
};

module.exports = {
  generateHash,
};
