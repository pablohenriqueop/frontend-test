import { FetchAdapter } from "./fetch.adapter";

const API_BASE_URL = "http://localhost:3001";

export const api = new FetchAdapter(API_BASE_URL);
