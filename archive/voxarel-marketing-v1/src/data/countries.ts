/**
 * ISO-3166 alpha-2 destination countries for the calculator's destination
 * select. Mirrors the app's country registry. Unpriced destinations simply
 * return `pricingAvailable:false` from the quote API ("request a quote").
 *
 * `popular` entries (common GCC export lanes) sort to the top of the picker.
 */

export interface Country {
  code: string;
  name: string;
  popular?: boolean;
}

export const countries: Country[] = [
  { code: "IN", name: "India", popular: true },
  { code: "PK", name: "Pakistan", popular: true },
  { code: "BD", name: "Bangladesh", popular: true },
  { code: "LK", name: "Sri Lanka", popular: true },
  { code: "PH", name: "Philippines", popular: true },
  { code: "GB", name: "United Kingdom", popular: true },
  { code: "US", name: "United States", popular: true },
  { code: "EG", name: "Egypt", popular: true },
  { code: "NG", name: "Nigeria", popular: true },
  { code: "KE", name: "Kenya", popular: true },
  { code: "AU", name: "Australia", popular: true },
  { code: "CN", name: "China", popular: true },
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BH", name: "Bahrain" },
  { code: "BE", name: "Belgium" },
  { code: "BR", name: "Brazil" },
  { code: "BG", name: "Bulgaria" },
  { code: "KH", name: "Cambodia" },
  { code: "CA", name: "Canada" },
  { code: "CL", name: "Chile" },
  { code: "CO", name: "Colombia" },
  { code: "HR", name: "Croatia" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czechia" },
  { code: "DK", name: "Denmark" },
  { code: "ET", name: "Ethiopia" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GR", name: "Greece" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "ID", name: "Indonesia" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KW", name: "Kuwait" },
  { code: "LB", name: "Lebanon" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "MT", name: "Malta" },
  { code: "MU", name: "Mauritius" },
  { code: "MX", name: "Mexico" },
  { code: "MA", name: "Morocco" },
  { code: "MM", name: "Myanmar" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "NZ", name: "New Zealand" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "QA", name: "Qatar" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "RW", name: "Rwanda" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "ZA", name: "South Africa" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "SD", name: "Sudan" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syria" },
  { code: "TW", name: "Taiwan" },
  { code: "TZ", name: "Tanzania" },
  { code: "TH", name: "Thailand" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VN", name: "Vietnam" },
  { code: "YE", name: "Yemen" },
  { code: "ZW", name: "Zimbabwe" },
];

/** Countries ordered with popular destinations first, then alphabetical. */
export const sortedCountries: Country[] = [
  ...countries.filter((c) => c.popular),
  ...countries.filter((c) => !c.popular).sort((a, b) => a.name.localeCompare(b.name)),
];

export const getCountryName = (code: string): string =>
  countries.find((c) => c.code === code)?.name ?? code;
