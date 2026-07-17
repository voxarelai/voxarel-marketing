/** Mock data for the Leads Portal app showcase (DashboardFrame screens). */

export interface RateRow {
  destination: string;
  service: "Sea" | "Air";
  rate: string;
}

export const rateRows: RateRow[] = [
  { destination: "India", service: "Sea", rate: "AED 9.50 / kg" },
  { destination: "India", service: "Air", rate: "AED 14.00 / kg" },
  { destination: "Pakistan", service: "Sea", rate: "AED 8.00 / kg" },
  { destination: "Philippines", service: "Air", rate: "AED 19.50 / kg" },
  { destination: "United Kingdom", service: "Air", rate: "AED 27.00 / kg" },
  { destination: "Nigeria", service: "Sea", rate: "AED 12.50 / kg" },
];

export interface LeadRow {
  name: string;
  destination: string;
  category: string;
  packages: string;
  status: "New" | "Quoted" | "Won";
}

export const leadRows: LeadRow[] = [
  { name: "Aisha Khan", destination: "India", category: "Personal", packages: "2 × 18 kg", status: "New" },
  { name: "Marcus Reyes", destination: "Philippines", category: "Commercial", packages: "12 × 25 kg", status: "New" },
  { name: "Tariq Aziz", destination: "Pakistan", category: "Personal", packages: "1 × 30 kg", status: "Quoted" },
  { name: "Grace Adeyemi", destination: "Nigeria", category: "Commercial", packages: "8 × 40 kg", status: "Won" },
];

export interface EmbedField {
  label: string;
  enabled: boolean;
}

export const embedFields: EmbedField[] = [
  { label: "Show your logo", enabled: true },
  { label: "Require contact details", enabled: true },
  { label: "Sea freight", enabled: true },
  { label: "Air freight", enabled: true },
  { label: "Show price breakdown", enabled: false },
];
