import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  DollarSign,
  BarChart2,
  PieChart,
  CreditCard,
  Zap,
} from "lucide-react";

const AIResumeCard = ({ data }) => {
  const cardRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Message copied to clipboard!");
  };

  const handleDownloadPDF = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20;
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, pdfHeight);
    pdf.save("Numeric_Finance_Report.pdf");
  };

  return (
    <div className="flex justify-center my-6">
      <div
        ref={cardRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 text-gray-800 font-sans"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-indigo-600">
            Numeric Finance by Prince Babu
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              Copy
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              PDF
            </button>
          </div>
        </div>

        {/* Income & Expenses */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-gray-500 text-sm">Income</p>
              <p className="text-lg font-semibold">₹{data?.income}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-red-500" />
            <div>
              <p className="text-gray-500 text-sm">Education</p>
              <p className="text-lg font-semibold">₹{data?.education}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <BarChart2 className="w-6 h-6 text-yellow-500" />
            <div>
              <p className="text-gray-500 text-sm">Medicine</p>
              <p className="text-lg font-semibold">₹{data?.medicine}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PieChart className="w-6 h-6 text-purple-500" />
            <div>
              <p className="text-gray-500 text-sm">Grocery</p>
              <p className="text-lg font-semibold">₹{data?.grocery}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6 text-indigo-500" />
            <div>
              <p className="text-gray-500 text-sm">Others</p>
              <p className="text-lg font-semibold">₹{data?.others}</p>
            </div>
          </div>
        </div>

        {/* Month & Year */}
        <div className="flex justify-between items-center mb-6 border-t pt-4">
          <p className="text-gray-500">Month: <span className="font-medium">{data?.month}</span></p>
          <p className="text-gray-500">Year: <span className="font-medium">{data?.year}</span></p>
        </div>

        {/* AI Suggestions */}
        {data?.suggestions && (
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-indigo-600 font-semibold mb-2">AI Suggestions:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {data.suggestions.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIResumeCard;
