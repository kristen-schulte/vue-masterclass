import axios from "axios";
import getDegrees from "@/api/getDegrees";
jest.mock("axios");

const axiosGetMock = axios.get as jest.Mock;

describe("getDegrees", () => {
  beforeEach(() => {
    axiosGetMock.mockResolvedValue({
      data: [
        {
          id: 1,
          degree: "Master's",
        },
      ],
    });
  });

  it("fetches degees", async () => {
    await getDegrees();
    expect(axios.get).toHaveBeenCalledWith("http://testapi.com/degrees");
  });

  it("extracts degrees from response", async () => {
    const data = await getDegrees();
    expect(data).toEqual([
      {
        id: 1,
        degree: "Master's",
      },
    ]);
  });
});
