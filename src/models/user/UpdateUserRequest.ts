import { Country } from "./CountryEnum";
import { Theme } from "./ThemeEnum";

export interface UpdateUserRequest {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  phoneCountry: Country;
  phoneNumber: string;
  mail: string;
  theme: Theme;
}