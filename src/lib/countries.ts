import { Country } from "@/models/user/CountryEnum";

export type CountryDetails = {
  phone_prefix: string;
  name: string;
};

export const country_images_url = "/assets/images/countries/";

export const countries: Record<Country, CountryDetails> = {
  [Country.CH]: { phone_prefix: "+41", name: "Switzerland"},
  [Country.DE]: { phone_prefix: "+49", name: "Germany" },
  [Country.FR]: { phone_prefix: "+33", name: "France" },
  [Country.AT]: { phone_prefix: "+43", name: "Austria" },
  [Country.IT]: { phone_prefix: "+39", name: "Italy" },
};

export const countryImage = (country: Country) => {
  return `${country_images_url}${countries[country].name}.png`
}