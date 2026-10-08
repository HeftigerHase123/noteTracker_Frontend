import { Country } from "./CountryEnum";

export interface UpdateUserRequest {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneCountry: Country;
  phoneNumber: string;
  mail: string;
}