import { Job } from "@/api/types";
import { Degree } from "@/api/types";

export interface GlobalState {
  isLoggedIn: boolean,
  jobs: Job[],
  degrees: Degree[],
  selectedOrganizations: string[],
  selectedJobTypes: string[],
  selectedDegrees: string[],
}