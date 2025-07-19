type PayoutRecord = {
  payoutRef: string;
  status: "Approved" | "Pending" | "Rejected";
  beneficiary: string;
  dateOfApproval: string; // e.g. "20 – May – 2025"
  payoutStatus: "Pending" | "Completed";
  receipt: string; // e.g. "ref_34.pdf" or "Pending"
};


export const payoutRecords: PayoutRecord[] = [
  {
    payoutRef: "45HJK0088938",
    status: "Approved",
    beneficiary: "Boma Dave",
    dateOfApproval: "20 – May – 2025",
    payoutStatus: "Pending",
    receipt: "Pending",
  },
  {
    payoutRef: "45HJK0088938",
    status: "Approved",
    beneficiary: "Boma Dave",
    dateOfApproval: "13 – Jun – 2025",
    payoutStatus: "Completed",
    receipt: "ref_34.pdf",
  },
  {
    payoutRef: "72KLZ9083321",
    status: "Pending",
    beneficiary: "Jane Doe",
    dateOfApproval: "01 – Jul – 2025",
    payoutStatus: "Pending",
    receipt: "Pending",
  },
  {
    payoutRef: "11ABC4567823",
    status: "Rejected",
    beneficiary: "John Smith",
    dateOfApproval: "28 – Apr – 2025",
    payoutStatus: "Pending",
    receipt: "Pending",
  },
  {
    payoutRef: "99ZZX1144228",
    status: "Approved",
    beneficiary: "Ada Nduka",
    dateOfApproval: "10 – Jan – 2025",
    payoutStatus: "Completed",
    receipt: "receipt_ada.pdf",
  },
];
