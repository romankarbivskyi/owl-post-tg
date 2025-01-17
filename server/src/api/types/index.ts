export interface Message {
  id: string;
  from: string;
  to: string;
  cc: boolean;
  subject: string;
  body_text: string;
  body_html: string;
  created_at: string;
  attachments: any[];
}

export interface Domain {
  name: string;
  type: string;
  forward_available: boolean;
  forward_max_seconds: number;
}

export interface Email {
  _id: string;
  email: string;
  token: string;
  __v: number;
}
