// src/utils/authUtils.ts - Frontend Auth Utilities

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Speichere JWT Token in localStorage
 */
export function saveToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

/**
 * Hole JWT Token aus localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem("auth_token");
}

/**
 * Lösche JWT Token aus localStorage
 */
export function clearToken(): void {
  localStorage.removeItem("auth_token");
}

/**
 * API Request mit Auth Header
 */
export async function apiCall(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    clearToken();
    window.location.href = "/login";
  }

  return response.json();
}

/**
 * Validiere Email Format
 */
export function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validiere Passwort Stärke
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Passwort muss mindestens 8 Zeichen lang sein");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Passwort muss mindestens einen Großbuchstaben enthalten");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Passwort muss mindestens eine Zahl enthalten");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validiere Namen
 */
export function validateName(name: string, fieldName: string = "Name"): string | null {
  if (!name || name.length < 2) {
    return `${fieldName} muss mindestens 2 Zeichen lang sein`;
  }
  if (!/^[a-zA-ZäöüßÄÖÜ\s-]+$/.test(name)) {
    return `${fieldName} kann nur Buchstaben, Leerzeichen und Bindestriche enthalten`;
  }
  return null;
}
