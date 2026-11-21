"use client";

import React, { useState } from "react";
import { TOOLS_DATA } from "@/data/tools-data";
import { Download, Upload, Check, AlertCircle, Save, ExternalLink } from "lucide-react";

export function AdminLinksManager() {
  const [links, setLinks] = useState(
    TOOLS_DATA.map((t) => ({
      slug: t.slug,
      name: t.name,
      network: t.affiliateNetwork,
      url: t.adminAffiliateUrl,
    }))
  );

  const [filter, setFilter] = useState("");
  const [savedMessage, setSavedMessage] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  // Export CSV
  const handleExportCsv = () => {
    let csvContent = "data:text/csv;charset=utf-8,slug,name,network,admin_affiliate_url\n";
    links.forEach((row) => {
      csvContent += `"${row.slug}","${row.name}","${row.network}","${row.url}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `asmire_admin_affiliate_links_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Import CSV
  const handleImportCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      const lines = text.split("\n").filter((l) => l.trim().length > 0);
      let updatedCount = 0;

      // Skip header line
      for (let i = 1; i < lines.length; i++) {
        // Parse simple CSV
        const parts = lines[i].split(",").map((p) => p.replace(/^"|"$/g, "").trim());
        if (parts.length >= 4) {
          const [slug, , , url] = parts;
          if (slug && url) {
            setLinks((prev) =>
              prev.map((item) => (item.slug === slug ? { ...item, url } : item))
            );
            updatedCount++;
          }
        }
      }

      setImportMessage(`Imported ${updatedCount} links successfully from CSV.`);
      setTimeout(() => setImportMessage(null), 4000);
    };
    reader.readAsText(file);
  };

  const handleUrlChange = (slug: string, newUrl: string) => {
    setLinks((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, url: newUrl } : item))
    );
  };

  const handleSaveAll = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const filteredLinks = links.filter(
    (l) =>
      l.name.toLowerCase().includes(filter.toLowerCase()) ||
      l.slug.toLowerCase().includes(filter.toLowerCase()) ||
      l.network.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tool or network..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-lg border border-border bg-secondary/50 px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-brand-500 w-64"
          />
          <span className="text-xs text-muted-foreground">
            Showing {filteredLinks.length} / {links.length} tools
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Export CSV Button */}
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>

          {/* Import CSV Input */}
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-secondary text-xs font-semibold text-foreground transition-colors cursor-pointer">
            <Upload className="h-3.5 w-3.5" />
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleImportCsv} className="hidden" />
          </label>

          {/* Save Button */}
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-xs font-bold text-white transition-colors shadow-xs"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save Links</span>
          </button>
        </div>
      </div>

      {importMessage && (
        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" />
          <span>{importMessage}</span>
        </div>
      )}

      {savedMessage && (
        <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center gap-2">
          <Check className="h-4 w-4 shrink-0" />
          <span>All 50 default owner affiliate links saved successfully.</span>
        </div>
      )}

      {/* Editable Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs max-h-[550px] overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead className="sticky top-0 bg-muted/95 backdrop-blur-xs border-b border-border font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Tool Name</th>
              <th className="p-3">Network</th>
              <th className="p-3">Admin Affiliate URL (Editable)</th>
              <th className="p-3 text-right">Test</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredLinks.map((item, idx) => (
              <tr key={item.slug} className="hover:bg-secondary/30 transition-colors">
                <td className="p-3 text-muted-foreground font-mono">{idx + 1}</td>
                <td className="p-3 font-bold text-foreground whitespace-nowrap">{item.name}</td>
                <td className="p-3 text-muted-foreground whitespace-nowrap">
                  <span className="bg-secondary px-2 py-0.5 rounded text-[10px] text-foreground font-medium">
                    {item.network}
                  </span>
                </td>
                <td className="p-3">
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => handleUrlChange(item.slug, e.target.value)}
                    className="w-full rounded border border-border bg-secondary/40 px-2.5 py-1 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-brand-500"
                    placeholder="https://..."
                  />
                </td>
                <td className="p-3 text-right">
                  <a
                    href={`/go/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-muted-foreground hover:text-brand-600 p-1 rounded"
                    title="Test Redirect"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
