const postgres = require("postgres");
require("dotenv").config({ path: ".env.local" });
if (!process.env.DATABASE_URL) {
  require("dotenv").config({ path: ".env" });
}

if (!process.env.DATABASE_URL) {
  console.error("No DATABASE_URL found");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL);

async function run() {
  console.log("Creating community_reviews table...");
  await sql`
    CREATE TABLE IF NOT EXISTS community_reviews (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      tool_slug TEXT NOT NULL,
      user_id UUID REFERENCES users(id),
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      rating_overall INTEGER NOT NULL,
      rating_value_for_money INTEGER NOT NULL,
      rating_ease_of_use INTEGER NOT NULL,
      pros TEXT NOT NULL,
      cons TEXT NOT NULL,
      content TEXT NOT NULL,
      real_monthly_cost_paid DOUBLE PRECISION,
      verification_status TEXT NOT NULL DEFAULT 'PENDING',
      verified_badge BOOLEAN NOT NULL DEFAULT FALSE,
      testing_grant_awarded BOOLEAN NOT NULL DEFAULT FALSE,
      testing_grant_amount DOUBLE PRECISION,
      reward_perks TEXT,
      helpful_votes_count INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );
  `;

  console.log("Creating review_evidences table...");
  await sql`
    CREATE TABLE IF NOT EXISTS review_evidences (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      review_id UUID NOT NULL REFERENCES community_reviews(id) ON DELETE CASCADE,
      evidence_type TEXT NOT NULL,
      evidence_file_path_private TEXT NOT NULL,
      fileName_original TEXT,
      file_name_original TEXT,
      file_size_bytes INTEGER NOT NULL,
      mime_type TEXT NOT NULL,
      uploaded_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
    );
  `;

  console.log("Adding indexes...");
  await sql`
    CREATE INDEX IF NOT EXISTS idx_community_reviews_tool_slug ON community_reviews(tool_slug);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_community_reviews_status ON community_reviews(verification_status);
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_review_evidences_review_id ON review_evidences(review_id);
  `;

  console.log("Phase 4 database tables and indexes initialized successfully!");
  await sql.end();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error creating tables:", err);
  process.exit(1);
});
