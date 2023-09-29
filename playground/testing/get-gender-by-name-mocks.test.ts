import axios from "axios";
import getGenderName from "./get-gender-by-name";

const GENDER_JOHN = {
  name: "john",
  gender: "male",
  probability: 0.999,
  count: 1,
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("[Mocks] Get gender by name", () => {
  test("should return gender", async () => {
    mockedAxios.get.mockResolvedValue({ data: GENDER_JOHN });

    const response = await getGenderName(GENDER_JOHN.name);

    expect(response).toEqual(GENDER_JOHN);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("[Spies] Get gender by name", () => {
  test("should return gender", async () => {
    // mock response from API
    jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: GENDER_JOHN }));

    const genderResponse = await getGenderName(GENDER_JOHN.name);
    // expect that getGenderByName() func returns what API returns
    expect(genderResponse).toEqual(GENDER_JOHN);
  });

  afterEach(() => {
    // clear all mocks to make sure that they won't be passed to any tests out of this file
    jest.clearAllMocks();
  });
});
