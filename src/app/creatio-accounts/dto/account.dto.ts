export interface Account {
  id: string;
  name: string;
  code?: string;
  countryName?: string | null;
  accountTypeName?: string | null;
  typeName?: string | null;
  phone?: string | null;
  web?: string | null;
}

export interface PagedResult {
  items: Account[];
  page: number;
  pageSize: number;
  total: number;
}

export interface CreateAccountPayload {
  Name: string;
  Code: string;
  Phone: string;
  Web: string;
  TypeId: string;
}