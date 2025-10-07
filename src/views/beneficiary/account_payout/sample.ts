// This is our single source of truth for mock loan data.
// In a real app, this would come from an API.

export type LoanRecord = {
  rosfNo: string;
  amount: number;
  name: string;
  status: 'Pending' | 'Approved';
  returnedStatus: string;
  loanType: 'Personal Loan' | 'Child Loan';
  // We've added a date to allow for month-based filtering
  dateOfApproval: string | null; // Null for pending loans
  // A new status specific to payouts
  payoutStatus?: 'Completed' | 'Pending'; 
};

export const sampleLoans: LoanRecord[] = [
  {
    rosfNo: 'ROSF/2013/OLDA/0078',
    amount: 80000,
    name: 'Boma Dave',
    status: 'Pending',
    returnedStatus: '—',
    loanType: 'Personal Loan',
    dateOfApproval: null,
  },
  {
    rosfNo: 'ROSF/2013/OLDA/0079',
    amount: 280000,
    name: 'Boma Dave',
    status: 'Approved',
    returnedStatus: '—',
    loanType: 'Child Loan',
    dateOfApproval: '2024-05-15',
    payoutStatus: 'Completed',
  },
  {
    rosfNo: 'ROSF/2024/PERS/0101',
    amount: 150000,
    name: 'Jane Doe',
    status: 'Approved',
    returnedStatus: '—',
    loanType: 'Personal Loan',
    dateOfApproval: '2024-05-22',
    payoutStatus: 'Pending',
  },
  {
    rosfNo: 'ROSF/2024/CHLD/0102',
    amount: 500000,
    name: 'John Smith',
    status: 'Pending',
    returnedStatus: '—',
    loanType: 'Child Loan',
    dateOfApproval: null,
  },
  {
    rosfNo: 'ROSF/2024/PERS/0103',
    amount: 320000,
    name: 'Emily White',
    status: 'Approved',
    returnedStatus: '—',
    loanType: 'Personal Loan',
    dateOfApproval: '2024-06-05',
    payoutStatus: 'Pending',
  },
];