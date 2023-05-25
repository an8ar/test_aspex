export interface LoginRequest {
  login: string;
  password: string;
}
export interface LoginResponse {
  exists: boolean
}
export interface SignUpRequest {
  login: string;
  password: string;
  number: string;
}
export interface SignUpResponse extends LoginResponse{}

export interface CSRFResponse {
  _csrf: string
}
