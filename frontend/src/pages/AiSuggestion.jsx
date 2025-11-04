import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Sparkles,
  TrendingDown,
  TrendingUp,
  DollarSign,
  Loader2,
  Download,
  FileText,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";


/**
 * AISuggestionsWithPDF 
 * - Shows AI suggestions (mock)
 * - User can select multiple templates
 * - Downloads a single multi-page PDF combining selected templates
 *
 * Notes:
 * - html2canvas may have CORS issues with cross-origin images.
 * - Generated PDF pages use A4 portrait sizing (210mm x 297mm).
 */

export default function AISuggestionsWithPDF() {
  const [expenses, setExpenses] = useState([
    { id: 1, category: "Food", amount: 1200 },
    { id: 2, category: "Transport", amount: 600 },
    { id: 3, category: "Entertainment", amount: 900 },
    { id: 4, category: "Investments", amount: 2500 },
    { id: 5, category: "Utilities", amount: 1100 },
  ]);

  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  // template selections
  const templates = [
    { id: "summary", name: "Summary Report" },
    { id: "detailed", name: "Detailed Report" },
    { id: "minimal", name: "Minimal Summary" },
  ];
  const [selectedTemplates, setSelectedTemplates] = useState(["summary"]);

  // refs to hidden template containers for HTML->canvas render
  const templateRefs = {
    summary: useRef(null),
    detailed: useRef(null),
    minimal: useRef(null),
  };

  useEffect(() => {
    // Mock AI generator (same logic from earlier)
    setLoadingSuggestions(true);
    const t = setTimeout(() => {
      const total = expenses.reduce((s, e) => s + e.amount, 0);
      const avg = total / expenses.length;

      const newSuggestions = [
        {
          title: "Optimize Your Spending",
          message:
            total > 5000
              ? "Your monthly spending is higher than average. Try reducing non-essential costs such as entertainment and transport."
              : "You're maintaining a healthy spending pattern. Keep tracking your expenses regularly.",
          trendUp: total <= 5000,
        },
        {
          title: "Investment Opportunity",
          message:
            avg < 1500
              ? "You have room to increase investments for better returns. Consider SIPs or low-risk funds."
              : "You're investing wisely. Monitor returns and rebalance quarterly.",
          trendUp: true,
        },
        {
          title: "AI Tip",
          message:
            "Reducing dining-out frequency by 15% can save around $100/month. Consider cooking more and tracking recurring subscriptions.",
          trendUp: true,
        },
      ];

      setSuggestions(newSuggestions);
      setLoadingSuggestions(false);
    }, 900);

    return () => clearTimeout(t);
  }, [expenses]);

  function toggleTemplate(id) {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // create a single multi-page PDF from selected templates
  async function downloadSelectedAsPDF() {
    if (selectedTemplates.length === 0) {
      alert("Select at least one template to export.");
      return;
    }

    try {
      const doc = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      // A4 dimensions in px approximations depend on DPI. We'll render each template as canvas and scale to fit A4.
      // Iterate through each selected template, render to canvas, convert to image, and add to pdf as new page.
      let first = true;
      for (const tplId of selectedTemplates) {
        const ref = templateRefs[tplId];
        if (!ref || !ref.current) continue;

        // make the element visible for rendering (we render from hidden container, ensure styles are applied)
        const element = ref.current;

        // html2canvas options: increase scale for better quality
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          backgroundColor: null,
          scrollY: -window.scrollY,
        });

        // Convert canvas to image data URL (PNG)
        const imgData = canvas.toDataURL("image/png");

        // Compute width/height to fit A4 while keeping aspect ratio
        const pageWidthMM = 210;
        const pageHeightMM = 297;
        const pxPerMM = canvas.width / (pageWidthMM *  (canvas.width / canvas.height) ); 
        // Better approach: use proportions from canvas size relative to desired mm dimensions.
        // We'll map canvas width to pageWidth and derive height proportionally.
        const imgProps = {
          widthPx: canvas.width,
          heightPx: canvas.height,
        };

        const pdfWidth = pageWidthMM;
        const pdfHeight = (imgProps.heightPx * pdfWidth) / imgProps.widthPx;

        if (!first) doc.addPage();
        doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        first = false;
      }

      // save file
      doc.save(`ai-suggestions-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Failed to generate PDF. See console for details.");
    }
  }

  // utility: render each template markup (visible only in DOM for html2canvas)
  function TemplateSummary() {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    return (
      <div
        ref={templateRefs.summary}
        className="w-[800px] p-8 bg-white text-black rounded-lg"
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">AI Suggestions — Summary</h1>
            <div className="text-sm text-gray-600">Numeric Finance</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Date</div>
            <div className="font-medium">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Expense Overview</h2>
          <div className="text-sm text-gray-700">Total expenses: ${total}</div>
        </div>

        <div className="space-y-3">
          {suggestions.map((s, i) => (
            <div key={i} className="p-3 border rounded">
              <div className="flex items-center justify-between">
                <div className="font-medium">{s.title}</div>
                <div className={`text-sm ${s.trendUp ? "text-green-600" : "text-red-600"}`}>
                  {s.trendUp ? "Positive" : "Negative"}
                </div>
              </div>
              <div className="text-sm text-gray-700 mt-1">{s.message}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-xs text-gray-500">Generated by AI suggestions • Numeric Finance</div>
      </div>
    );
  }

  function TemplateDetailed() {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    return (
      <div
        ref={templateRefs.detailed}
        className="w-[800px] p-8 bg-white text-black rounded-lg"
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
      >
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Detailed AI Report</h1>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Expenses</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px", borderBottom: "1px solid #e5e7eb" }}>Category</th>
                <th style={{ textAlign: "right", padding: "6px", borderBottom: "1px solid #e5e7eb" }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td style={{ padding: "6px 0" }}>{e.category}</td>
                  <td style={{ padding: "6px 0", textAlign: "right" }}>${e.amount}</td>
                </tr>
              ))}
              <tr>
                <td style={{ paddingTop: "8px", fontWeight: 700 }}>Total</td>
                <td style={{ textAlign: "right", paddingTop: "8px", fontWeight: 700 }}>${total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">AI Insights</h2>
          <ul style={{ marginLeft: 16 }}>
            {suggestions.map((s, i) => (
              <li key={i} style={{ marginBottom: 6 }}>
                <strong>{s.title}:</strong> {s.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  function TemplateMinimal() {
    const total = expenses.reduce((s, e) => s + e.amount, 0);
    return (
      <div
        ref={templateRefs.minimal}
        className="w-[800px] p-6 bg-white text-black rounded-lg"
        style={{ fontFamily: "Inter, Arial, sans-serif" }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">Quick Summary</h1>
          <div className="text-sm">Date: {new Date().toLocaleDateString()}</div>
        </div>
        <div className="mb-3">
          <div className="text-sm text-gray-700">Total expenses</div>
          <div className="text-2xl font-semibold">${total}</div>
        </div>

        <div>
          <div className="text-sm text-gray-700 mb-2">Top tips</div>
          <ol style={{ marginLeft: 16 }}>
            {suggestions.slice(0, 2).map((s, i) => (
              <li key={i} style={{ marginBottom: 6 }}>{s.message}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  }

  // main visible page UI
  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-200 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h1 className="text-2xl font-semibold flex items-center gap-2 text-white">
          <Brain className="text-purple-500" size={26} /> AI Smart Suggestions
        </h1>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
            <FileText size={16} /> Select templates:
            <div className="flex gap-2 ml-2">
              {templates.map((t) => (
                <label key={t.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedTemplates.includes(t.id)}
                    onChange={() => toggleTemplate(t.id)}
                    className="accent-purple-500"
                  />
                  <span>{t.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={downloadSelectedAsPDF}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white"
          >
            <Download size={16} /> Export selected as PDF
          </button>
        </div>
      </div>

      {/* Expenses Overview */}
      <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">Your Expense Overview</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expenses.map((item) => (
            <div key={item.id} className="bg-[#1f2937] p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition">
              <p className="text-gray-400 text-sm">{item.category}</p>
              <p className="text-xl font-semibold text-gray-100">${item.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-100">
            <Sparkles className="text-purple-400" size={20} /> Personalized AI Suggestions
          </h2>
        </div>

        {loadingSuggestions ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="animate-spin text-purple-500" size={28} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {suggestions.map((s, i) => (
              <div key={i} className="bg-[#1f2937] p-5 rounded-xl border border-gray-700 hover:border-purple-500 transition shadow-md">
                <div className="flex items-center gap-3 mb-2">
                  {s.trendUp ? <TrendingUp className="text-green-400" /> : <TrendingDown className="text-red-400" />}
                  <h3 className="text-gray-100 font-medium">{s.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{s.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hidden template renderers */}
      <div style={{ position: "absolute", left: -9999, top: -9999, pointerEvents: "none", opacity: 0 }}>
        {/* Only render templates that exist in refs to reduce work */}
        <div>{/* Summary template */}{TemplateSummary()}</div>
        <div>{/* Detailed template */}{TemplateDetailed()}</div>
        <div>{/* Minimal template */}{TemplateMinimal()}</div>
      </div>

      <div className="text-xs text-gray-500 mt-6">Tip: select multiple templates to produce a combined PDF (one page per template).</div>
    </div>
  );
}
