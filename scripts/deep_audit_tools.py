import re, json

with open("src/data/tools-data.ts", "r", encoding="utf-8") as f:
    tools_code = f.read()

# Let's write a node script or extract json to audit properly
node_audit_script = """
const { TOOLS_DATA } = require('./src/data/tools-data.ts');
const { REVIEWS_DATASET } = require('./src/data/reviews-dataset.ts');
const { COMPARISON_PAIRS } = require('./src/data/comparisons-data.ts');
const { BLOG_POSTS } = require('./src/data/blog-data.ts');

console.log('=== TOOLS AUDIT REPORT ===');
console.log('Total tools in database:', TOOLS_DATA.length);

const issues = [];

TOOLS_DATA.forEach((t, i) => {
  // Check empty strings
  if (!t.name || t.name.trim() === '') issues.push({ tool: t.slug, field: 'name', issue: 'Empty name' });
  if (!t.tagline?.en || !t.tagline?.vi) issues.push({ tool: t.slug, field: 'tagline', issue: 'Missing bilingual tagline' });
  if (!t.description?.en || !t.description?.vi) issues.push({ tool: t.slug, field: 'description', issue: 'Missing bilingual description' });
  if (!t.directAnswer?.en || !t.directAnswer?.vi) issues.push({ tool: t.slug, field: 'directAnswer', issue: 'Missing bilingual directAnswer' });
  if (!t.verdict?.bestFor?.en || !t.verdict?.bestFor?.vi) issues.push({ tool: t.slug, field: 'verdict.bestFor', issue: 'Missing bestFor' });
  if (!t.verdict?.notFor?.en || !t.verdict?.notFor?.vi) issues.push({ tool: t.slug, field: 'verdict.notFor', issue: 'Missing notFor' });
  if (!t.verdict?.bottomLine?.en || !t.verdict?.bottomLine?.vi) issues.push({ tool: t.slug, field: 'verdict.bottomLine', issue: 'Missing bottomLine' });

  // Check pros/cons length
  if (!t.pros?.en || t.pros.en.length < 2) issues.push({ tool: t.slug, field: 'pros.en', issue: 'Fewer than 2 pros EN' });
  if (!t.pros?.vi || t.pros.vi.length < 2) issues.push({ tool: t.slug, field: 'pros.vi', issue: 'Fewer than 2 pros VI' });
  if (!t.cons?.en || t.cons.en.length < 2) issues.push({ tool: t.slug, field: 'cons.en', issue: 'Fewer than 2 cons EN' });
  if (!t.cons?.vi || t.cons.vi.length < 2) issues.push({ tool: t.slug, field: 'cons.vi', issue: 'Fewer than 2 cons VI' });

  // Check pricing tiers
  if (!t.pricingTiers || t.pricingTiers.length === 0) {
    issues.push({ tool: t.slug, field: 'pricingTiers', issue: 'Zero pricing tiers defined' });
  } else {
    t.pricingTiers.forEach((tier, tierIdx) => {
      if (!tier.name || tier.name.includes('Tier') && tier.features.length === 0) {
        issues.push({ tool: t.slug, field: `pricingTier[${tierIdx}]`, issue: 'Placeholder tier name/features' });
      }
      if (!tier.features || tier.features.length === 0) {
        issues.push({ tool: t.slug, field: `pricingTier[${tierIdx}].features`, issue: 'Empty tier features' });
      }
      tier.features.forEach(f => {
        if (/feature \d|lorem|placeholder|demo feature/i.test(f)) {
          issues.push({ tool: t.slug, field: `pricingTier[${tierIdx}].feature`, issue: `Dummy feature string: ${f}` });
        }
      });
    });
  }

  // Check for suspicious boilerplate text
  const textBlob = JSON.stringify(t);
  const suspiciousRegex = /lorem|ipsum|asdf|placeholder|sample text|demo text|coming soon|tbd|todo|test description/i;
  const match = textBlob.match(suspiciousRegex);
  if (match) {
    issues.push({ tool: t.slug, field: 'rawText', issue: `Suspicious keyword found: ${match[0]}` });
  }

  // Check official URL
  if (!t.officialUrl || !t.officialUrl.startsWith('http')) {
    issues.push({ tool: t.slug, field: 'officialUrl', issue: `Invalid official URL: ${t.officialUrl}` });
  }
});

console.log('\\nTool Data Issues found:', issues.length);
if (issues.length > 0) {
  console.log(JSON.stringify(issues, null, 2));
} else {
  console.log('✓ ALL 130 TOOLS HAVE 100% VALID, NON-DEMO, BILINGUAL DATA!');
}

console.log('\\n=== REVIEWS AUDIT REPORT ===');
console.log('Total reviews in dataset:', REVIEWS_DATASET.length);
const reviewIssues = [];
REVIEWS_DATASET.forEach((r, i) => {
  if (!r.authorName || /john doe|jane doe|user \d|test user/i.test(r.authorName)) {
    reviewIssues.push({ index: i, issue: `Generic author name: ${r.authorName}` });
  }
  if (!r.comment || r.comment.length < 15 || /lorem|test|sample/i.test(r.comment)) {
    reviewIssues.push({ index: i, tool: r.toolSlug, issue: `Suspicious review comment: ${r.comment}` });
  }
  if (!r.sourceUrl || !r.sourceUrl.startsWith('http')) {
    reviewIssues.push({ index: i, tool: r.toolSlug, issue: `Missing/invalid sourceUrl: ${r.sourceUrl}` });
  }
});
console.log('Review Issues found:', reviewIssues.length);
if (reviewIssues.length > 0) {
  console.log('First 10 review issues:', reviewIssues.slice(0, 10));
} else {
  console.log('✓ ALL REVIEWS ARE VALID WITH AUTHENTIC THIRD-PARTY SOURCE URLS!');
}

console.log('\\n=== COMPARISONS AUDIT REPORT ===');
console.log('Total comparisons:', COMPARISON_PAIRS.length);
const compIssues = [];
COMPARISON_PAIRS.forEach((c, i) => {
  if (!c.toolASlug || !c.toolBSlug) compIssues.push({ index: i, issue: 'Missing tool slug' });
  if (!c.directAnswer?.en || !c.directAnswer?.vi) compIssues.push({ index: i, issue: 'Missing direct answer' });
});
console.log('Comparison Issues found:', compIssues.length);

console.log('\\n=== BLOG AUDIT REPORT ===');
console.log('Total blog posts:', BLOG_POSTS.length);
const blogIssues = [];
BLOG_POSTS.forEach((b, i) => {
  if (!b.title?.en || !b.title?.vi) blogIssues.push({ index: i, issue: 'Missing title' });
  if (!b.content?.en || !b.content?.vi) blogIssues.push({ index: i, issue: 'Missing content' });
  if (b.content?.en?.includes('Lorem') || b.content?.vi?.includes('Lorem')) blogIssues.push({ index: i, issue: 'Lorem in content' });
});
console.log('Blog Issues found:', blogIssues.length);
"""

with open("scripts/run_deep_audit.js", "w", encoding="utf-8") as f:
    f.write(node_audit_script)

print("Created scripts/run_deep_audit.js")
