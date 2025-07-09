export type ApiResponse<T, K extends string> = {
  readonly message: string;
} & {
  [P in K]: T
};