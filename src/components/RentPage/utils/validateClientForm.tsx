import dayjs from "dayjs";
import { useState } from "react";

type ValidatorProps = {
  clientInfo: {
    first_name: string;
    last_name: string;
    identification_type: string;
    identification_number: string;
    phone: string;
    email: string;
    birth_date: dayjs.Dayjs;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
};

export default function validator({ clientInfo }: ValidatorProps) {
  const [errors, setErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
    identification_type: "",
    identification_number: "",
    phone: "",
    birth_date: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const validate = () => {
    let temp = { ...errors };
    temp.email =
      (clientInfo.email ? "" : "This field is required.") ||
      (!/.+@.+\..+/.test(clientInfo.email) ? "Email is not valid." : "");
    temp.first_name = clientInfo.first_name ? "" : "This field is required.";
    temp.last_name = clientInfo.last_name ? "" : "This field is required.";
    temp.identification_type = clientInfo.identification_type
      ? ""
      : "This field is required.";
    temp.identification_number = clientInfo.identification_number
      ? ""
      : "This field is required.";
    temp.phone =
      (clientInfo.phone ? "" : "This field is required.") ||
      (/^\d{10}$/.test(clientInfo.phone)
        ? ""
        : "Phone number must be 10 digits and contain only numbers.");
    temp.birth_date = clientInfo.birth_date ? "" : "This field is required.";
    temp.address = clientInfo.address ? "" : "This field is required.";
    temp.city = clientInfo.city ? "" : "This field is required.";
    temp.state = clientInfo.state ? "" : "This field is required.";
    temp.zip = clientInfo.zip ? "" : "This field is required.";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x === "");
  };

  return { validate, errors };
}
