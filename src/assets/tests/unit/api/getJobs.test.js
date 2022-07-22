import axios from "axios";
import getJobs from "@/api/getJobs";
jest.mock("axios");

describe("getJobs", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Java Engineer",
        },
      ],
    });
  });

  it("fetches listed jobs", async () => {
    await getJobs();
    expect(axios.get).toHaveBeenCalledWith("http://testapi.com/jobs");
  });

  it("extracts jobs from response", async () => {
    const data = await getJobs();
    expect(data).toEqual([
      {
        id: 1,
        title: "Java Engineer",
      },
    ]);
  });
});
