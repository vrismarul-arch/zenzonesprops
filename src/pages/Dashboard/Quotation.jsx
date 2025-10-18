import React from 'react';
import { Card, Table, Row, Col, Typography, Divider, Space, Button } from 'antd';
import jsPDF from "jspdf";
import "jspdf-autotable";

const { Title, Text } = Typography;

// --- Sample data for the quotation (Updated with new billing details) ---
const quotationData = {
    biller: {
        company: "REALTIME SECURITY ZONE",
        address: "9/13, S.S. Arcade, Wallers Road, Mount Road, Chennai - 600002",
        contact: "044-42118620 / 42108620",
        email: "realtime.chennai@gmail.com",
        gstin: "33AAWFR7305P1ZF",
    },
    customer: {
        company: "SVJ SMART SOLUTIONS",
        address: "M52 ANNAI ILLAM 9TH STREET, Chennai - Tamil Nadu",
        gstin: "33ADZFS0260J1ZP",
    },
    quotationInfo: {
        number: "QN-2526-7418",
        date: "07-07-2025",
    },
    items: [
        {
            sn: 1,
            description: "ESSL ESSL X990 BIOMETRIC SYSTEM (C+ID)",
            hsn: "85437099",
            gst: "18%",
            quantity: 2,
            uqc: "NOS",
            price: 8783,
            discPercent: "2%",
            taxableRate: 8607.34,
            amount: 17214.68,
        },
    ],
    totals: {
        taxableAmt: 17214.68,
        cgst: 1549.32,
        sgst: 1549.32,
        totalGst: 3098.64,
        roundup: -0.32,
        grandTotal: 20313.0,
    },
    amountInWords: "Twenty Thousand Three Hundred And Thirteen Rupees Only",
    bankDetails: {
        name: "IDFC FIRST BANK",
        accountName: "REALTIME SECURITY ZONE",
        accountNo: "10189975852",
        ifsc: "IDFB0080142",
    },
};

const columns = [
    { title: "S/N", dataIndex: "sn" },
    { title: "Description Of Goods / Service", dataIndex: "description" },
    { title: "HSN/SAC", dataIndex: "hsn" },
    { title: "GST", dataIndex: "gst" },
    { title: "Quantity", dataIndex: "quantity" },
    { title: "UQC", dataIndex: "uqc" },
    { title: "Price", dataIndex: "price" },
    { title: "Disc %", dataIndex: "discPercent" },
    { title: "Disc", dataIndex: "disc", render: () => "-" },
    { title: "Including GST", dataIndex: "includingGst", render: () => (quotationData.items[0].price * 1.18).toFixed(2)},
    { title: "Taxable Rate", dataIndex: "taxableRate" },
    { title: "Amount", dataIndex: "amount" },
];

// --- Function to generate the quotation PDF ---
const generateQuotationPDF = () => {
    const doc = new jsPDF();

    // Header section
    doc.setFontSize(10);
    doc.text(quotationData.biller.company, 20, 20);
    doc.text(quotationData.biller.address, 20, 25);
    doc.text(`Tel: ${quotationData.biller.contact}`, 20, 30);
    doc.text(`Email: ${quotationData.biller.email}`, 20, 35);
    doc.text(`GSTIN: ${quotationData.biller.gstin}`, 20, 40);

    // Title
    doc.setFontSize(18);
    doc.text("Quotation", 105, 60, null, null, "center");

    // Quotation info
    doc.setFontSize(10);
    doc.text(`Quotation No. : ${quotationData.quotationInfo.number}`, 150, 60);
    doc.text(`Date : ${quotationData.quotationInfo.date}`, 150, 65);

    // Bill To section
    doc.text("To,", 20, 80);
    doc.setFontSize(12);
    doc.text(quotationData.customer.company, 20, 85);
    doc.setFontSize(10);
    doc.text(quotationData.customer.address, 20, 90);
    doc.text(`GSTIN: ${quotationData.customer.gstin}`, 20, 95);

    // Table of items
    const tableColumn = [
        "S/N", "Description Of Goods / Service", "HSN/SAC", "GST", "Qty", "UQC", "Price",
        "Disc", "Taxable Rate", "Amount",
    ];
    const tableRows = quotationData.items.map(item => [
        item.sn, item.description, item.hsn, item.gst, item.quantity, item.uqc, item.price,
        item.discPercent, item.taxableRate, item.amount,
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'grid',
        headStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0] },
    });

    // Get the y-position after the table
    let finalY = doc.autoTable.previous.finalY;

    // Totals Section
    doc.setFontSize(10);
    doc.text(`Taxable Amt: ${quotationData.totals.taxableAmt.toFixed(2)}`, 150, finalY + 10);
    doc.text(`CGST @ 9%: ${quotationData.totals.cgst.toFixed(2)}`, 150, finalY + 15);
    doc.text(`SGST @ 9%: ${quotationData.totals.sgst.toFixed(2)}`, 150, finalY + 20);
    doc.text(`Grand Total: ${quotationData.totals.grandTotal.toFixed(2)}`, 150, finalY + 25);

    // Amount in Words
    finalY += 35;
    doc.text(`Amount Chargeable (In Words): ${quotationData.amountInWords}`, 20, finalY);

    // Bank Details
    finalY += 15;
    doc.setFontSize(12);
    doc.text("Bank Details:", 20, finalY);
    doc.setFontSize(10);
    doc.text(`BANK NAME: ${quotationData.bankDetails.name}`, 20, finalY + 5);
    doc.text(`A/C NAME: ${quotationData.bankDetails.accountName}`, 20, finalY + 10);
    doc.text(`A/C No.: ${quotationData.bankDetails.accountNo}`, 20, finalY + 15);
    doc.text(`IFSC CODE: ${quotationData.bankDetails.ifsc}`, 20, finalY + 20);

    // Save the PDF
    doc.save("Quotation.pdf");
};

// --- React Component UI (same as previous response) ---
export default function QuotationComponent() {
    return (
        <div style={{ maxWidth: 1200, margin: "20px auto", padding: "20px" }}>
            <Card style={{ borderRadius: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                {/* Header Section */}
                <Row justify="space-between" align="middle">
                    <Col>
                        <Space align="start">
                            <div className="logo"></div>
                            <div>
                                <Title level={4}>REALTIME SECURITY ZONE (2025-26)</Title>
                                <Text>No-9/13, S.S. Arcade, Wallers Road, Mount Road</Text>
                                <Text>Chennai-600002.</Text>
                                <Text>Tel: 044-42118620 / 42108620, Email: realtime.chennai@gmail.com</Text>
                                <Text>Contact Person : VISHAL, Mob:8072563700</Text>
                                <Text>GSTIN : 33AAWFR7305P1ZF</Text>
                            </div>
                        </Space>
                    </Col>
                </Row>
                <Divider />
                {/* Quotation Header */}
                <Row justify="center">
                    <Col>
                        <Title level={3}>Quotation</Title>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col span={6}>
                        <Text>Quotation No.: {quotationData.quotationInfo.number}</Text>
                    </Col>
                </Row>
                <Row justify="end">
                    <Col span={6}>
                        <Text>Date: {quotationData.quotationInfo.date}</Text>
                    </Col>
                </Row>
                <Divider />
                {/* Bill To / Ship To Section */}
                <Row>
                    <Col span={12}>
                        <Text>To,</Text>
                        <Title level={5}>{quotationData.customer.company}</Title>
                        <Text>{quotationData.customer.address}</Text>
                        <Text>GSTIN : {quotationData.customer.gstin}</Text>
                    </Col>
                </Row>
                <Divider />
                {/* Table of Items */}
                <Table columns={columns} dataSource={quotationData.items} pagination={false} size="small" />
                {/* Totals Section */}
                <Row justify="end" style={{ marginTop: '16px' }}>
                    <Col span={8}>
                        <Row justify="space-between">
                            <Text>Taxable Amt</Text>
                            <Text>{quotationData.totals.taxableAmt.toFixed(2)}</Text>
                        </Row>
                        <Row justify="space-between">
                            <Text>CGST @ 9%</Text>
                            <Text>{quotationData.totals.cgst.toFixed(2)}</Text>
                        </Row>
                        <Row justify="space-between">
                            <Text>SGST @ 9%</Text>
                            <Text>{quotationData.totals.sgst.toFixed(2)}</Text>
                        </Row>
                    </Col>
                </Row>
                <Row justify="end" style={{ marginTop: '8px' }}>
                    <Col span={8}>
                        <Row justify="space-between">
                            <Text strong>Grand Total</Text>
                            <Text strong>{quotationData.totals.grandTotal}</Text>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                {/* Amount in Words */}
                <Text>Amount Chargeable (In Words): {quotationData.amountInWords}</Text>
                <Divider />
                {/* Bank Details and Download Button */}
                <Row gutter={16} align="bottom">
                    <Col span={12}>
                        <Title level={5}>Bank Details:</Title>
                        <Text>BANK NAME : {quotationData.bankDetails.name}</Text><br/>
                        <Text>A/C NAME : {quotationData.bankDetails.accountName}</Text><br/>
                        <Text>A/C No. : {quotationData.bankDetails.accountNo}</Text><br/>
                        <Text>IFSC CODE : {quotationData.bankDetails.ifsc}</Text><br/>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                        <Button type="primary" onClick={generateQuotationPDF}>
                            Download Quotation PDF
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}