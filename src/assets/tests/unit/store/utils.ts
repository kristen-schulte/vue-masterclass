import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";
import state from "@/store/state";

export function createState(config: Partial<GlobalState> = {}): GlobalState {
  const initialState = state();
  return { ...initialState, ...config };
}

export function createJob(config: Partial<Job> = {}): Job {
  return {
    "id": 1,
    "title": "Angular Developer",
    "organization": "Vue and Me",
    "degree": "Master's",
    "jobType": "Intern",
    "locations": ["Lisbon"],
    "minimumQualifications": [],
    "preferredQualifications": [],
    "description": [],
    "dateAdded": "2021-07-04",
    ...config
  };
}