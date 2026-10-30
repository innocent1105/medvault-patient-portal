# MedVault Care

Build a fully functional frontend prototype for a patient-centered digital health record system called “MedVault”.



Tech stack:



- React + TypeScript

- Tailwind CSS

- No backend (use mock data and local state or localStorage)

- Component-based architecture



Objective:

Create a realistic, interactive prototype that simulates how patients store, view, and share their medical history. The system should feel production-ready from a UX perspective, even though it uses mock data.



Core Features:



1. Authentication (UI only)



- Login screen with email + password

- Option for biometric login (UI simulation only)

- After login, redirect to dashboard



2. Dashboard



- Welcome message with patient name

- Summary cards:

  - Allergies

  - Current medications

  - Recent visits

  - Lab results

- “Quick Actions”:

  - View full history

  - Share record

  - Generate access code



3. Medical History Page



- Table or card-based layout

- Each record includes:

  - Date

  - Facility name

  - Diagnosis

  - Prescription

  - Notes

- Click a record → open modal with full details



4. Health Summary Page



- Highlight:

  - Allergies

  - Chronic conditions

  - Medications

  - Blood type

- Clean, easy-to-read layout for emergency use



5. Share / Access Control



- Button: “Generate Access Code”

- Generate a random 6-digit code (frontend logic)

- Display expiry countdown (e.g., 10 minutes)

- Option to show QR code (use a mock QR library or placeholder)

- UI for “What doctor can see” (limited summary view)



6. Access Log Page



- List of mock access events:

  - Doctor name

  - Facility

  - Timestamp

  - Purpose

- Styled like an audit trail



7. Settings Page



- Profile info (name, ID, phone)

- Security settings (2FA toggle UI)

- Data control (download data button UI)



UX Requirements:



- Mobile-first design (target Android users in Zambia)

- Clean, minimal, medical-grade UI

- Use icons (lucide-react)

- Smooth transitions (modals, page changes)

- Clear hierarchy and readability



Data Handling:



- Use mock JSON data for patient records

- Persist basic state using localStorage

- Simulate API calls with setTimeout



Design Guidelines:



- Use a calm color palette (blues/greens)

- Emphasize trust, clarity, and accessibility

- Avoid clutter



Bonus (if possible):



- Offline mode indicator (simulate “data cached locally”)

- Search/filter in medical history

- Dark mode toggle



Output Requirements:



- Provide complete React component code

- Organize into reusable components (Dashboard, History, Share, etc.)

- Include routing (React Router)

- Ensure code is clean and readable



Do not include backend code. Focus entirely on frontend behavior and user experience.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://medvault-patient-portal.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5b43d63b-06be-4a4a-bb78-531415eb8755).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
