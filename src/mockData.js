export const mockInvoices = [
    {
        InvoiceId: "INV-001",
        CustomerName: "Công ty TNHH ABC",
        InvoiceDate: "2025-07-01",
        DueDate: "2025-07-15",
        TotalAmount: "1500",
        Currency: "USD",
        Company: {
            Name: "AI Invoice Scanner Inc.",
            Address: "123 Đường Công Nghệ, TP. HCM",
        },
        BillTo: {
            Name: "Công ty TNHH ABC",
            Address: "45 Nguyễn Trãi, Hà Nội",
        },
        ShipTo: {
            Name: "Kho Hà Nội",
            Address: "KCN Bắc Thăng Long, Hà Nội",
        },
        Items: [
            {
                Description: "Dịch vụ tư vấn AI",
                Quantity: 10,
                UnitPrice: "100",
                Amount: "1000",
            },
            {
                Description: "Phí triển khai",
                Quantity: 1,
                UnitPrice: "500",
                Amount: "500",
            },
        ],
        Tax: { Rate: 10, Amount: "150" },
        PaymentTerms: {
            DueWithinDays: 14,
            PayableTo: "AI Invoice Scanner Inc.",
        },
    },
    {
        InvoiceId: "INV-002",
        CustomerName: "Công ty XYZ",
        InvoiceDate: "2025-06-28",
        DueDate: "2025-07-10",
        TotalAmount: "800",
        Currency: "USD",
        Company: {
            Name: "AI Invoice Scanner Inc.",
            Address: "123 Đường Công Nghệ, TP. HCM",
        },
        BillTo: {
            Name: "Công ty XYZ",
            Address: "Số 9, Lê Lợi, TP. HCM",
        },
        ShipTo: {
            Name: "Kho TP. HCM",
            Address: "KCN Tân Bình, TP. HCM",
        },
        Items: [
            {
                Description: "Dịch vụ bảo trì",
                Quantity: 4,
                UnitPrice: "200",
                Amount: "800",
            },
        ],
        Tax: { Rate: 8, Amount: "64" },
        PaymentTerms: {
            DueWithinDays: 12,
            PayableTo: "AI Invoice Scanner Inc.",
        },
    },
    {
        InvoiceId: "INV-003",
        CustomerName: "Công ty DEF",
        InvoiceDate: "2025-07-05",
        DueDate: "2025-07-20",
        TotalAmount: "2300",
        Currency: "USD",
        Company: {
            Name: "AI Invoice Scanner Inc.",
            Address: "123 Đường Công Nghệ, TP. HCM",
        },
        BillTo: {
            Name: "Công ty DEF",
            Address: "12 Trần Hưng Đạo, Đà Nẵng",
        },
        ShipTo: {
            Name: "Kho Đà Nẵng",
            Address: "KCN Hòa Khánh, Đà Nẵng",
        },
        Items: [
            {
                Description: "Phần mềm quản lý hóa đơn",
                Quantity: 1,
                UnitPrice: "2000",
                Amount: "2000",
            },
            {
                Description: "Hỗ trợ kỹ thuật",
                Quantity: 3,
                UnitPrice: "100",
                Amount: "300",
            },
        ],
        Tax: { Rate: 10, Amount: "230" },
        PaymentTerms: {
            DueWithinDays: 15,
            PayableTo: "AI Invoice Scanner Inc.",
        },
    },
    {
        InvoiceId: "INV-004",
        CustomerName: "Công ty GHI",
        InvoiceDate: "2025-07-10",
        DueDate: "2025-07-25",
        TotalAmount: "1200",
        Currency: "USD",
        Company: {
            Name: "AI Invoice Scanner Inc.",
            Address: "123 Đường Công Nghệ, TP. HCM",
        },
        BillTo: {
            Name: "Công ty GHI",
            Address: "78 Nguyễn Huệ, TP. HCM",
        },
        ShipTo: {
            Name: "Kho TP. HCM",
            Address: "KCN Tân Tạo, TP. HCM",
        },
        Items: [
            {
                Description: "Đào tạo nhân viên",
                Quantity: 6,
                UnitPrice: "200",
                Amount: "1200",
            },
        ],
        Tax: { Rate: 5, Amount: "60" },
        PaymentTerms: {
            DueWithinDays: 20,
            PayableTo: "AI Invoice Scanner Inc.",
        },
    },
];
