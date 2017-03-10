export class GithubIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  number: number;
  title: string;
  user: {};
  labels: any[];
  state: string;
  locked: boolean;
  assignee: string | null;
  assignees: any[];
  milestone: string | null;
  comments: number;
  created_at: string;
  updated_at:string;
  closed_at: string | null;
  body: string
}
