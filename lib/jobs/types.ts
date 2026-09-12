export type JobSourceType =
  | "job_board"
  | "company_careers"
  | "api"
  | "rss"
  | "other";

export type NormalizedJob = {
  title: string;
  company: string;
  companyLogoUrl?: string | null;
  description: string;
  location?: string | null;
  remoteStatus: "remote" | "hybrid" | "onsite";
  employmentType?: string | null;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;
  experienceLevel?: string | null;
  skills: string[];
  category?: string | null;
  sourceName: string;
  sourceUrl: string;
  originalJobUrl: string;
  applicationUrl: string;
  postedAt?: string | null;
};

export type JobSource = {
  id: string;
  name: string;
  sourceType: JobSourceType;
  baseUrl: string;
  jobsUrl?: string | null;
  isActive: boolean;
  aggregationAllowed: boolean;
};

export interface JobSourceAdapter {
  fetchJobs(source: JobSource): Promise<NormalizedJob[]>;
}
