const postgres = require("postgres");
require("dotenv").config({ path: ".env.local" });
if (!process.env.DATABASE_URL) require("dotenv").config({ path: ".env" });
const sql = postgres(process.env.DATABASE_URL);

async function run() {
  await sql`
    UPDATE community_reviews 
    SET verification_status = 'VERIFIED', 
        verified_badge = true, 
        testing_grant_awarded = true, 
        testing_grant_amount = 100,
        reward_perks = 'Testing Grant $100 + Asmire Pro 1 Year'
    WHERE id = '341d43b8-5edd-4620-ae02-f13e78e8c72b';
  `;
  console.log("Review approved successfully with Verified Buyer badge and Testing Grant $100!");
  await sql.end();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
