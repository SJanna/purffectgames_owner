export type Client = {
  id: number;
  first_name: string;
  last_name: string;
  identification_type: string;
  identification_number: string;
  phone: string;
  email: string;
  birth_date: Date;
  address: string;
  city: string;
  state: string;
  zip: string;
  rental_ids?: number[];
};