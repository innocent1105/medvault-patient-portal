export interface Patient {
  name: string;
  patientId: string;
  email: string;
  phone: string;
  bloodType: string;
  dob: string;
  gender: string;
}

export interface MedicalRecord {
  id: string;
  date: string;
  facility: string;
  doctor: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  type: "Visit" | "Lab" | "Imaging" | "Vaccination";
}

export interface AccessEvent {
  id: string;
  doctor: string;
  facility: string;
  timestamp: string;
  purpose: string;
}

export const mockPatient: Patient = {
  name: "Chanda Mwansa",
  patientId: "MV-2025-00482",
  email: "chanda.mwansa@medvault.zm",
  phone: "+260 97 555 0142",
  bloodType: "O+",
  dob: "1992-04-18",
  gender: "Female",
};

export const allergies = ["Penicillin", "Peanuts", "Sulfa drugs"];

export const chronicConditions = ["Asthma (mild)", "Hypertension"];

export const currentMedications = [
  { name: "Salbutamol Inhaler", dose: "100mcg", frequency: "As needed" },
  { name: "Amlodipine", dose: "5mg", frequency: "Once daily" },
  { name: "Vitamin D3", dose: "1000 IU", frequency: "Once daily" },
];

export const labResults = [
  { name: "Complete Blood Count", date: "2025-04-12", status: "Normal" },
  { name: "Lipid Panel", date: "2025-03-02", status: "Borderline" },
  { name: "HbA1c", date: "2025-02-14", status: "Normal" },
];

export const medicalRecords: MedicalRecord[] = [
  {
    id: "r1",
    date: "2025-04-22",
    facility: "University Teaching Hospital, Lusaka",
    doctor: "Dr. M. Banda",
    diagnosis: "Seasonal asthma flare-up",
    prescription: "Salbutamol inhaler 100mcg, Prednisolone 20mg x 5 days",
    notes: "Patient advised to avoid dust exposure. Follow-up in 2 weeks.",
    type: "Visit",
  },
  {
    id: "r2",
    date: "2025-04-12",
    facility: "Lusaka Trust Hospital",
    doctor: "Dr. P. Phiri",
    diagnosis: "Routine blood work",
    prescription: "—",
    notes: "All values within normal range.",
    type: "Lab",
  },
  {
    id: "r3",
    date: "2025-03-02",
    facility: "Levy Mwanawasa Hospital",
    doctor: "Dr. K. Tembo",
    diagnosis: "Hypertension follow-up",
    prescription: "Continue Amlodipine 5mg daily",
    notes: "BP 132/85. Reduce salt intake.",
    type: "Visit",
  },
  {
    id: "r4",
    date: "2025-01-18",
    facility: "Ndola Central Hospital",
    doctor: "Dr. J. Zulu",
    diagnosis: "Annual immunization",
    prescription: "Influenza vaccine administered",
    notes: "No adverse reaction.",
    type: "Vaccination",
  },
  {
    id: "r5",
    date: "2024-11-05",
    facility: "CFB Medical Centre",
    doctor: "Dr. L. Mulenga",
    diagnosis: "Chest X-ray — clear",
    prescription: "—",
    notes: "Imaging requested for persistent cough; no abnormalities detected.",
    type: "Imaging",
  },
];

export const accessEvents: AccessEvent[] = [
  {
    id: "a1",
    doctor: "Dr. M. Banda",
    facility: "University Teaching Hospital",
    timestamp: "2025-04-22 10:14",
    purpose: "Consultation — respiratory",
  },
  {
    id: "a2",
    doctor: "Dr. P. Phiri",
    facility: "Lusaka Trust Hospital",
    timestamp: "2025-04-12 08:42",
    purpose: "Lab review",
  },
  {
    id: "a3",
    doctor: "Dr. K. Tembo",
    facility: "Levy Mwanawasa Hospital",
    timestamp: "2025-03-02 14:30",
    purpose: "Hypertension follow-up",
  },
  {
    id: "a4",
    doctor: "Emergency Triage",
    facility: "UTH Emergency Dept.",
    timestamp: "2025-02-19 22:08",
    purpose: "Emergency summary view",
  },
];
