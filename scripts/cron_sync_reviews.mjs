#!/usr/bin/env node
/**
 * Asmire 10-Hour Scheduled Review Sync Script
 * Runs every 10 hours via system crontab: 0 *\/10 * * *
 * Calls the local production endpoint: http://127.0.0.1:3000/api/cron/sync-reviews
 */

const CRON_SECRET = process.env.CRON_SECRET || "asmire_cron_secret_2026";
const TARGET_URL = process.env.CRON_TARGET_URL || "http://127.0.0.1:3000/api/cron/sync-reviews";

async function runCronSync() {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [CRON_SYNC_REVIEWS] Starting 10-hour scheduled review ingestion...`);

  try {
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CRON_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const status = response.status;
    const data = await response.json();

    if (response.ok && data.success) {
      console.log(`[${new Date().toISOString()}] [CRON_SYNC_REVIEWS] SUCCESS: Updated ${data.totalTools} tools in ${data.durationMs}ms.`);
      console.log(`[${new Date().toISOString()}] [CRON_SYNC_REVIEWS] Sources: ${data.sourcesScanned?.join(", ")}`);
      process.exit(0);
    } else {
      console.error(`[${new Date().toISOString()}] [CRON_SYNC_REVIEWS] ERROR (HTTP ${status}):`, data);
      process.exit(1);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [CRON_SYNC_REVIEWS] FATAL ERROR:`, error.message || error);
    process.exit(1);
  }
}

runCronSync();
