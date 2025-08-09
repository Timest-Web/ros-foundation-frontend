export interface DocumentRow {
  id: number;
  firstName: string;
  secondName: string;
  documentType: string;
  fileName: string;
  status: "Verified" | "Not Verified";
}

export const mockDocuments: DocumentRow[] = [
  {
    id: 1,
    firstName: "Boma",
    secondName: "Dave",
    documentType: "NIN",
    fileName: "boma_Nin.pdf",
    status: "Not Verified",
  },
  {
    id: 2,
    firstName: "Boma",
    secondName: "Dave",
    documentType: "Drivers License",
    fileName: "boma_Nin.pdf",
    status: "Verified",
  },
  {
    id: 3,
    firstName: "Ada",
    secondName: "Okeke",
    documentType: "International Passport",
    fileName: "ada_passport.pdf",
    status: "Verified",
  },
  {
    id: 4,
    firstName: "Tunde",
    secondName: "Bakare",
    documentType: "Voter's Card",
    fileName: "tunde_voterscard.pdf",
    status: "Not Verified",
  },
  {
    id: 5,
    firstName: "Praise",
    secondName: "Kuyooro",
    documentType: "NIN",
    fileName: "praise_nin.pdf",
    status: "Verified",
  },
  {
    id: 6,
    firstName: "Ngozi",
    secondName: "Nwosu",
    documentType: "Drivers License",
    fileName: "ngozi_license.pdf",
    status: "Not Verified",
  },
  {
    id: 7,
    firstName: "Samuel",
    secondName: "Ibrahim",
    documentType: "NIN",
    fileName: "samuel_nin.pdf",
    status: "Verified",
  },
  {
    id: 8,
    firstName: "Fatima",
    secondName: "Abubakar",
    documentType: "International Passport",
    fileName: "fatima_passport.pdf",
    status: "Not Verified",
  },
];
