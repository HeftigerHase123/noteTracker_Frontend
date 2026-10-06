import { Country } from "./CountryEnum";

export interface UserDtoResponse {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  phoneCountry: Country;
  phoneNumber: string;
  mail: string;
}