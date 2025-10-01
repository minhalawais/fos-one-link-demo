"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import axiosInstance from "../utils/axiosConfig.ts"
import MBALogo from "../assets/mba_logo.tsx"

interface InvoiceData {
  id: string
  invoice_number: string
  customer_name: string
  customer_address: string
  customer_internet_id: string
  customer_phone: string
  service_plan_name: string
  billing_start_date: string
  billing_end_date: string
  due_date: string
  subtotal: number
  discount_percentage: number
  total_amount: number
  invoice_type: string
  notes: string
  status: string
}

interface PaymentDetails {
  id: string
  amount: number
  payment_date: string
  payment_method: string
  transaction_id?: string
  notes?: string
}

interface BankAccount {
  id: string
  bank_name: string
  account_title: string
  account_number: string
  iban?: string
  branch_code?: string
}

const PublicInvoicePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null)
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = "MBA NET - Invoice"
    fetchInvoiceData()
    fetchBankAccounts()
  }, [id])

  const fetchInvoiceData = async () => {
    try {
      const response = await axiosInstance.get(`/public/invoice/${id}`)
      setInvoiceData(response.data)
      if (response.data.status === "paid") {
        fetchPaymentDetails(id)
      }
      setError(null)
    } catch (error) {
      console.error("Failed to fetch invoice data", error)
      setError("Failed to load invoice data. Please check the link.")
    }
  }

  const fetchPaymentDetails = async (invoiceId: string) => {
    try {
      const response = await axiosInstance.get(`/public/payments/invoice/${invoiceId}`)
      if (response.data) {
        setPaymentDetails(response.data)
      }
    } catch (error) {
      console.error("Failed to fetch payment details", error)
    }
  }

  const fetchBankAccounts = async () => {
    try {
      const response = await axiosInstance.get("/public/bank-accounts/list")
      setBankAccounts(response.data)
    } catch (error) {
      console.error("Failed to fetch bank accounts", error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${months[date.getMonth()]}/${date.getDate()}/${date.getFullYear()}`
  }

  const handleDownloadPDF = async () => {
    if (!printRef.current) return

    setIsDownloading(true)
    setError(null)

    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: printRef.current.scrollWidth,
        height: printRef.current.scrollHeight,
      })

      const imgData = canvas.toDataURL("image/jpeg", 0.8)
      const pdf = new jsPDF("p", "mm", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`Invoice-${invoiceData?.invoice_number}.pdf`)
    } catch (error) {
      console.error("PDF generation failed:", error)
      setError("Failed to generate PDF. Please try again.")
    } finally {
      setIsDownloading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-[#D1FAE5] text-[#10B981] shadow-lg"
      case "pending":
        return "bg-[#FEF3C7] text-[#F59E0B]"
      case "overdue":
        return "bg-[#FEE2E2] text-[#EF4444]"
      default:
        return "bg-[#EBF5FF] text-[#4A5568]"
    }
  }

  if (!invoiceData && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-blue-600 rounded mb-4"></div>
          <div className="text-gray-800">Loading invoice details...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            onClick={fetchInvoiceData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-balance">Invoice Details</h1>
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className={`flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 ${
              isDownloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div ref={printRef} className="p-8">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">INVOICE</div>
                  <div className="text-gray-600">#{invoiceData?.invoice_number}</div>
                </div>
                <div className="text-right">
                  <div className="h-12 w-24 mb-2">
                    <MBALogo variant="landscape" />
                  </div>
                  <div className="text-gray-800 font-semibold text-sm">MBA Communications</div>
                  <div className="text-gray-600 text-xs">Kharak Stop Overhead Bridge</div>
                  <div className="text-gray-600 text-xs">City, Lahore 54000</div>
                </div>
              </div>
            </div>

            {/* Customer & Invoice Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <h2 className="text-xs font-semibold text-gray-700 uppercase mb-2">Bill To</h2>
                  <div className="text-gray-800 font-semibold mb-1">{invoiceData?.customer_name}</div>
                  <div className="text-gray-600 text-sm mb-1">Internet ID: {invoiceData?.customer_internet_id}</div>
                  <div className="text-gray-600 text-sm mb-1">Phone: {invoiceData?.customer_phone}</div>
                  <div className="text-gray-600 text-sm">{invoiceData?.customer_address}</div>
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-gray-700 uppercase mb-1">Status</h2>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      invoiceData?.status || "",
                    )}`}
                  >
                    {invoiceData?.status?.toUpperCase()}
                  </span>
                </div>
              </div>
              <div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <h2 className="text-xs font-semibold text-gray-700 uppercase mb-1">Invoice Date</h2>
                      <div className="text-gray-600 text-sm">
                        {invoiceData?.billing_start_date && formatDate(invoiceData.billing_start_date)}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-xs font-semibold text-gray-700 uppercase mb-1">Due Date</h2>
                      <div className="text-gray-600 text-sm">
                        {invoiceData?.due_date && formatDate(invoiceData.due_date)}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-gray-700 uppercase mb-1">Billing Period</h2>
                    <div className="text-gray-600 text-sm">
                      {invoiceData?.billing_start_date && formatDate(invoiceData.billing_start_date)} -{" "}
                      {invoiceData?.billing_end_date && formatDate(invoiceData.billing_end_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service details table */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="text-left text-xs font-semibold text-white uppercase py-2 px-3">
                        Service Description
                      </th>
                      <th className="text-right text-xs font-semibold text-white uppercase py-2 px-3">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-3">
                        <div className="text-gray-800 font-semibold mb-1">
                          {invoiceData?.service_plan_name || invoiceData?.invoice_type}
                        </div>
                        <div className="text-gray-600 text-xs">
                          Service Period:{" "}
                          {invoiceData?.billing_start_date && formatDate(invoiceData.billing_start_date)} -{" "}
                          {invoiceData?.billing_end_date && formatDate(invoiceData.billing_end_date)}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right text-gray-800 font-semibold">
                        PKR {invoiceData?.subtotal.toFixed(2)}
                      </td>
                    </tr>
                    {invoiceData?.discount_percentage > 0 && (
                      <tr className="border-b border-gray-200">
                        <td className="py-2 px-3 text-gray-700 text-sm">
                          Discount ({invoiceData.discount_percentage}%)
                        </td>
                        <td className="py-2 px-3 text-right text-green-600 font-semibold text-sm">
                          -PKR {(invoiceData.subtotal * (invoiceData.discount_percentage / 100)).toFixed(2)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-800">
                      <td className="py-3 px-3 text-right font-semibold text-white uppercase text-sm">
                        Total Amount
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="text-xl font-bold text-white">
                          PKR {invoiceData?.total_amount.toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Payment details if paid */}
            {paymentDetails && (
              <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
                <h2 className="text-sm font-semibold text-green-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Payment Confirmed
                </h2>
                <div className="grid md:grid-cols-2 gap-3 text-green-800 text-sm">
                  <div>
                    <span className="font-semibold">Payment Date:</span> {formatDate(paymentDetails.payment_date)}
                  </div>
                  <div>
                    <span className="font-semibold">Amount Paid:</span> PKR {paymentDetails.amount.toFixed(2)}
                  </div>
                  <div>
                    <span className="font-semibold">Payment Method:</span> {paymentDetails.payment_method}
                  </div>
                  {paymentDetails.transaction_id && (
                    <div>
                      <span className="font-semibold">Transaction ID:</span> {paymentDetails.transaction_id}
                    </div>
                  )}
                </div>
                {paymentDetails.notes && (
                  <div className="mt-3 text-sm">
                    <span className="font-semibold">Notes:</span> {paymentDetails.notes}
                  </div>
                )}
              </div>
            )}

            {/* Bank accounts */}
            {bankAccounts.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  Payment Information
                </h2>
                <p className="text-gray-600 mb-3 text-sm">
                  Payment can be made to any of the following bank accounts:
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {bankAccounts.map((account, index) => (
                    <div key={account.id} className="bg-white rounded-lg p-3 border-l-4 border-gray-800">
                      <div className="font-semibold text-gray-800 mb-2 text-sm">
                        {index + 1}. {account.bank_name}
                      </div>
                      <div className="space-y-1 text-gray-600 text-xs">
                        <div>
                          <span className="font-medium">Account Title:</span> {account.account_title}
                        </div>
                        <div>
                          <span className="font-medium">Account Number:</span> {account.account_number}
                        </div>
                        {account.iban && (
                          <div>
                            <span className="font-medium">IBAN:</span> {account.iban}
                          </div>
                        )}
                        {account.branch_code && (
                          <div>
                            <span className="font-medium">Branch Code:</span> {account.branch_code}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            {invoiceData?.notes && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h2 className="text-sm font-semibold text-gray-800 mb-2">Additional Notes</h2>
                <div className="text-gray-600 text-sm">{invoiceData.notes}</div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center mt-8 pt-4 border-t border-gray-200">
              <div className="text-gray-800 font-semibold mb-1">Thank you for your business!</div>
              <div className="text-gray-600 text-sm mb-1">
                Questions? Contact us at support@Mba.net92@gmail.com or call 0323 4689090
              </div>
              <div className="text-gray-500 text-xs">
                Invoice generated on {formatDate(new Date().toISOString())}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicInvoicePage