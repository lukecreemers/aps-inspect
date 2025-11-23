export interface ExampleType {
  id: string;
  name: string;
}

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
