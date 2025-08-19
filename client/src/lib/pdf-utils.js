import jsPDF from 'jspdf';

export function generateFinancialPDF({ kpiData, profitMargins }) {
  const doc = new jsPDF();
  doc.text('EcoCycle Financial Report', 14, 16);
  doc.text(`Total Revenue: ${kpiData.totalRevenue}`, 14, 28);
  doc.text(`Net Profit: ${kpiData.netProfit}`, 14, 36);
  doc.text('Profit Margins:', 14, 50);
  profitMargins.forEach((row, idx) => {
    doc.text(`${row.month}: revenue ${row.revenue}, profit ${row.profit}`, 16, 58 + idx * 8);
  });
  return doc;
}

export function generatePaymentsPDF(records) {
  const doc = new jsPDF();
  doc.text('EcoCycle Payments Report', 14, 16);
  records.forEach((r, idx) => {
    doc.text(`${r.id} ${r.description} ${r.amount}`, 14, 28 + idx * 8);
  });
  return doc;
}

export function printComponent(elementId) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const w = window.open('', 'print');
  w.document.write(`<html><head><title>Print</title></head><body>${el.outerHTML}</body></html>`);
  w.document.close();
  w.focus();
  w.print();
  w.close();
}

