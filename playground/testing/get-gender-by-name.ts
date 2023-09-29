import axios from "axios";

const API_URL = "https://api.genderize.io";

type GenderResponse = {
  name: string;
  gender: string;
  probability: number;
  count: number;
};

const getGenderName = async (name: string): Promise<GenderResponse | Error> => {
  const { data: gender } = await axios.get<GenderResponse>(
    `${API_URL}?name${name}`
  );
  return gender;
};

export default getGenderName;
