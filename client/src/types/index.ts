export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  cc: boolean;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: string;
  attachments: Attachment[];
}

export interface NewEmail {
  email: string;
  token: string;
}

export interface Domain {
  name: string;
  type: string;
  forward_available: boolean;
  forward_max_seconds: number;
}

export enum UserRole {
  ADMIN = "Admin",
  CUSTOMER = "Customer",
}

export interface User {
  tgId: string;
  role: UserRole;
}

export interface Email {
  _id: string;
  email: string;
  token: string;
  __v: number;
}

export interface Attachment {
  id: string;
  has_preview: boolean;
  name: string;
  size: number;
}
