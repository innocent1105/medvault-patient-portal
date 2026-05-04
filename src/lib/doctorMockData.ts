import { mockPatient, allergies, chronicConditions, currentMedications, medicalRecords, accessEvents, type Patient, type MedicalRecord, type AccessEvent } from "./mockData";

export interface DoctorPatient {
  patient: Patient;
  bloodType: string;
  allergies: string[];
  chronicConditions: string[];
  medications: { name: string; dose: string; frequency: string }[];
  records: MedicalRecord[];
  accessEvents: AccessEvent[];
  lastVisit: string;
  shareCode: string;
}

export const doctorPatients: DoctorPatient[] = [
  {
    patient: mockPatient,
    bloodType: mockPatient.bloodType,
    allergies,
    chronicConditions,
    medications: currentMedications,
    records: medicalRecords,
    accessEvents,
    lastVisit: "2025-04-22",
    shareCode: "428193",
  },
  {
    patient: {
      name: "Joseph Sakala",
      patientId: "MV-2025-00921",
      email: "joseph.sakala@medvault.zm",
      phone: "+260 96 442 1190",
      bloodType: "A+",
      dob: "1978-09-02",
      gender: "Male",
    },
    bloodType: "A+",
    allergies: ["Aspirin"],
    chronicConditions: ["Type 2 Diabetes"],
    medications: [
      { name: "Metformin", dose: "500mg", frequency: "Twice daily" },
      { name: "Atorvastatin", dose: "20mg", frequency: "Once daily" },
    ],
    records: [
      {
        id: "j1",
        date: "2025-04-15",
        facility: "Lusaka Trust Hospital",
        doctor: "Dr. M. Banda",
        diagnosis: "Diabetes follow-up",
        prescription: "Continue Metformin",
        notes: "Fasting glucose stable.",
        type: "Visit",
      },
    ],
    accessEvents: [
      { id: "ja1", doctor: "Dr. M. Banda", facility: "Lusaka Trust Hospital", timestamp: "2025-04-15 09:20", purpose: "Diabetes follow-up" },
    ],
    lastVisit: "2025-04-15",
    shareCode: "771204",
  },
  {
    patient: {
      name: "Naomi Lungu",
      patientId: "MV-2025-01187",
      email: "naomi.lungu@medvault.zm",
      phone: "+260 95 778 0341",
      bloodType: "B-",
      dob: "1995-12-19",
      gender: "Female",
    },
    bloodType: "B-",
    allergies: [],
    chronicConditions: [],
    medications: [],
    records: [
      {
        id: "n1",
        date: "2025-03-30",
        facility: "University Teaching Hospital",
        doctor: "Dr. M. Banda",
        diagnosis: "Annual physical — healthy",
        prescription: "—",
        notes: "All vitals within normal range.",
        type: "Visit",
      },
    ],
    accessEvents: [
      { id: "na1", doctor: "Dr. M. Banda", facility: "UTH", timestamp: "2025-03-30 11:05", purpose: "Annual physical" },
    ],
    lastVisit: "2025-03-30",
    shareCode: "305618",
  },
];

export function findByCode(code: string): DoctorPatient | undefined {
  return doctorPatients.find((p) => p.shareCode === code);
}
