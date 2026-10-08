import { Country } from "./CountryEnum";

export interface CreateUserRequest {
  password: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneCountry: string; //Country
  phoneNumber: string;
  mail: string;
}