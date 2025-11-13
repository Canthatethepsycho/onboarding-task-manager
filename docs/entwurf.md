# 📐 Architekturdesign - Onboarding Task Manager

## 1. Übersicht der Anwendungsarchitektur

### 1.1 Gewähltes Architektur-Pattern: **Modified MVC mit Client-Server Separation**

```
┌─────────────────────────────────────────────────────────────────────┐
│                          FRONTEND LAYER (React)                     │
│                              MV* Pattern                             │
├─────────────────────────────────────────────────────────────────────┤
│ Views (React Components)                                             │
│ ├─ Pages (Home, Login, Register, Users)                             │
│ ├─ Components (MainLayout, Navbar, Toast)                           │
│ └─ Utilities (Auth, Validation)                                     │
│                                                                      │
│ Data Layer (Local State + API)                                       │
│ ├─ useState() für lokalen State                                      │
│ ├─ apiCall() für Backend Kommunikation                              │
│ └─ localStorage für Session Persistierung                           │
└─────────────────────────────────────────────────────────────────────┘
                            ↕ REST API (HTTP)
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND LAYER (Express)                        │
│                      REST API + Business Logic                      │
├─────────────────────────────────────────────────────────────────────┤
│ Routes (Express)                                                     │
│ ├─ POST /api/register                                               │
│ ├─ POST /api/login                                                  │
│ ├─ GET /api/users (geschützt)                                       │
│ └─ POST /api/auth/verify                                            │
│                                                                      │
│ Business Logic (Models)                                              │
│ ├─ Auth (JWT Token Management)                                      │
│ ├─ Validation (Email, Passwort, Namen)                              │
│ └─ User Management (addUser, getUsers)                              │
└─────────────────────────────────────────────────────────────────────┘
                            ↕ SQL Queries
┌─────────────────────────────────────────────────────────────────────┐
│                    DATABASE LAYER (PostgreSQL)                      │
│                      Persistente Datenspeicherung                   │
├─────────────────────────────────────────────────────────────────────┤
│ Table: users                                                         │
│ ├─ id (Primary Key)                                                 │
│ ├─ first_name, last_name                                            │
│ ├─ email (Unique)                                                   │
│ ├─ password_hash                                                    │
│ └─ role (user | admin)                                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 2. Detaillierte Architektur-Komponenten

### 2.1 Frontend Architektur (React + Vite)

#### **Schichtenaufbau:**

```
┌─ Presentation Layer ────────────────────────────────────┐
│  React Components (JSX/TSX)                             │
│  ├─ Pages/       (High-level Seiten)                   │
│  ├─ Components/  (Wiederverwendbare UI Elemente)       │
│  └─ Styling      (CSS Dateien)                         │
├─ Business Logic Layer ─────────────────────────────────┤
│  Utilities (authUtils.ts)                              │
│  ├─ Token Management                                    │
│  ├─ Validierung                                        │
│  └─ API Kommunikation                                  │
├─ Data Layer ──────────────────────────────────────────┤
│  React State Management                                │
│  ├─ Local State (useState)                             │
│  ├─ localStorage (Token Persistierung)                 │
│  └─ sessionStorage (Temporäre Daten)                   │
└─ Transport Layer ─────────────────────────────────────┘
   REST API (HTTP Requests)
```

#### **Komponenten-Struktur:**

```
src/
├─ pages/
│  ├─ App.tsx               # Route Definition (Routing Logik)
│  ├─ Home.tsx             # Landing Page
│  ├─ login.tsx            # Login Form (Authentifizierung)
│  ├─ Register.tsx         # Registration Form (User Creation)
│  ├─ Users.tsx            # User Listing (Protected Route)
│  └─ ForgotPassword.tsx   # Password Reset Placeholder
│
├─ components/
│  ├─ MainLayout.tsx       # Layout Wrapper (Navbar + Footer)
│  ├─ Navbar.tsx           # Navigation Component
│  ├─ DotGridBackground.tsx# Animated Background
│  ├─ Onboarding.tsx       # Onboarding Flow
│  └─ Toast.tsx            # Notification System
│
├─ utils/
│  └─ authUtils.ts         # Auth & Validation Utilities
│
└─ config/
   └─ (Reserved für Zukunft)
```

#### **Datenfluss (Frontend):**

```
User Input (Form)
    ↓
Validation (Client-side)
    ↓
API Call (apiCall())
    ↓
Response Handling
    ↓
State Update (useState)
    ↓
Component Re-render
    ↓
UI Update mit Toast Notification
```

---

### 2.2 Backend Architektur (Express.js)

#### **Schichtenaufbau:**

```
┌─ Request Handler Layer ────────────────────────────────┐
│  Express Routes                                        │
│  ├─ POST /api/register                                │
│  ├─ POST /api/login                                   │
│  ├─ GET /api/users                                    │
│  └─ POST /api/auth/verify                             │
├─ Middleware Layer ─────────────────────────────────────┤
│  ├─ CORS (Cross-Origin Resource Sharing)              │
│  ├─ Body Parser (JSON Parsing)                        │
│  ├─ Auth Middleware (JWT Verification)                │
│  └─ Error Handling                                    │
├─ Business Logic Layer ─────────────────────────────────┤
│  ├─ Auth Service (JWT Token Generation/Verification)  │
│  ├─ Validation Service (Email, Passwort, Namen)      │
│  ├─ User Service (addUser, getUsers)                  │
│  └─ Encryption Service (bcrypt)                       │
├─ Data Access Layer ─────────────────────────────────────┤
│  ├─ Database Connection (postgres client)             │
│  ├─ Query Builder (SQL)                               │
│  └─ Transaction Management                            │
└─ Database Layer ────────────────────────────────────────┘
   PostgreSQL (Persistente Daten)
```

#### **Dateistruktur Backend:**

```
server/
├─ server.js              # Express App + Routes
├─ auth.js               # JWT Authentication Logic
├─ db.js                 # Database Connection
└─ models/
   └─ users.js           # User Data Access Functions
```

#### **Request Processing Flow:**

```
HTTP Request
    ↓
CORS Middleware (✓ Origin prüfen)
    ↓
Body Parser (JSON Parse)
    ↓
Route Handler
    ├─ Input Validierung
    ├─ Auth Middleware (falls nötig)
    ├─ Business Logic
    │  ├─ Datenbank Query
    │  ├─ Encryption/Hashing
    │  └─ JWT Token Generation
    ├─ Response Präparation
    └─ HTTP Response (200, 201, 400, 401, 500)
    ↓
Error Handling (Try-Catch)
    ↓
JSON Response an Frontend
```

---

### 2.3 Database Architektur (PostgreSQL)

#### **Tabellen-Design:**

```sql
-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index für schnelle Email-Suche
CREATE UNIQUE INDEX idx_users_email ON users(email);
```

#### **Datenzugriff (Data Access Pattern):**

```
Application Layer
    ↓
SQL Query Generation (in models/users.js)
    ↓
postgres Client
    ↓
SQL Execution
    ↓
Result Processing
    ↓
Return Data zu Application
```

---

## 3. Begründung der Architektur

### 3.1 **Warum MVC-ähnliche Architektur?**

| Vorteil | Erklärung |
|---------|-----------|
| **Separation of Concerns** | Views, Business Logic und Data Layer sind getrennt |
| **Maintainability** | Code ist organisiert und leicht zu finden |
| **Testability** | Jede Schicht kann isoliert getestet werden |
| **Scalability** | Neue Features können einfach hinzugefügt werden |
| **Reusability** | Components und Utilities sind wiederverwendbar |

### 3.2 **Warum React Frontend?**

| Grund | Vorteil |
|-------|---------|
| **Component-Based** | Wiederverwendbare UI-Teile |
| **Virtual DOM** | Effiziente Rendering Performance |
| **State Management** | Einfacher mit useState/useEffect |
| **Hot Reload** | Vite ermöglicht schnelle Entwicklung |
| **Ecosystem** | Viele Libraries verfügbar (React Router, etc.) |

**Alternative hätten sein:**
- Vue.js (simpler, aber weniger Ecosystem)
- Angular (zu komplex für dieses Projekt)
- Svelte (zu neu, kleineres Ecosystem)

### 3.3 **Warum Express.js Backend?**

| Grund | Vorteil |
|-------|---------|
| **Lightweight** | Minimal, kein unnötiges Overhead |
| **Node.js** | JavaScript auf Frontend + Backend |
| **Middleware Pattern** | Einfach zu verstehen und zu erweitern |
| **Performance** | Asynchronous I/O, schnell |
| **Ecosystem** | npm packages für alles verfügbar |

**Alternative hätten sein:**
- Nest.js (zu komplex, bessere TypeScript Unterstützung)
- Django/Flask (Python, weniger JavaScript Synergy)
- Spring Boot (Java, overkill für Azubi-Projekt)

### 3.4 **Warum PostgreSQL Datenbank?**

| Grund | Vorteil |
|-------|---------|
| **Relational** | Strukturierte Daten (Benutzer, Rollen) |
| **ACID Compliance** | Datenkonsistenz garantiert |
| **Scalable** | Auch bei wachsenden Datenmengen performant |
| **Open Source** | Kostenlos, keine Lizenzkosten |
| **Mature** | Seit 25+ Jahren stabil und zuverlässig |

**Alternative hätten sein:**
- MySQL (ähnlich, weniger Features)
- MongoDB (NoSQL, overkill für strukturierte Daten)
- SQLite (Single-file, nicht für Multi-User geeignet)

---

## 4. Sicherheitsarchitektur

### 4.1 **Authentication Flow**

```
┌─ Registration ───────────────────────┐
│ 1. User gibt Credentials ein         │
│ 2. Password wird mit bcrypt gehashed  │
│ 3. Benutzer wird in DB gespeichert    │
│ 4. JWT Token wird generiert          │
│ 5. Token wird an Frontend gesendet    │
│ 6. Token wird in localStorage gespeichert
└─────────────────────────────────────┘

┌─ Login ──────────────────────────────┐
│ 1. User gibt Email + Password ein     │
│ 2. User wird in DB gesucht           │
│ 3. Password wird mit bcrypt verglichen│
│ 4. JWT Token wird generiert          │
│ 5. Token wird an Frontend gesendet    │
│ 6. Token wird in localStorage gespeichert
└─────────────────────────────────────┘

┌─ Protected Request ──────────────────┐
│ 1. Frontend sendet Token im Header    │
│ 2. Backend prüft Token Signatur      │
│ 3. Token ist gültig → Request erlaubt │
│ 4. Token ist ungültig → 401 Error     │
│ 5. Frontend leitet zu Login um        │
└─────────────────────────────────────┘
```

### 4.2 **Sicherheits-Layers**

```
Layer 1: Input Validation
├─ Frontend: Email Regex, Passwort Stärke
└─ Backend: Alle Inputs validieren

Layer 2: Password Security
├─ bcrypt Hashing (10 Salt Rounds)
└─ Niemals Passwort in Logs/Response

Layer 3: Token Security
├─ JWT mit Secret signiert
├─ 7 Tage Gültigkeitsdauer
└─ Signatur mit HMAC-SHA256

Layer 4: Transport Security
├─ CORS validiert Origins
├─ HTTPS empfohlen (nicht im Dev)
└─ Credentials nur über HTTPS

Layer 5: API Security
├─ authMiddleware auf geschützten Routes
├─ Rate Limiting (empfohlen)
└─ Input Sanitization (empfohlen)
```

---

## 5. Datenflusss-Beispiele

### 5.1 **Registrierungs-Flow (Detailed)**

```
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Register.tsx)                                     │
├─────────────────────────────────────────────────────────────┤
│ 1. User füllt Form aus                                      │
│    - first_name: "Viktor"                                   │
│    - last_name: "Schmidt"                                   │
│    - email: "viktor@example.com"                            │
│    - password: "SecurePass123"                              │
│                                                              │
│ 2. Frontend Validierung                                     │
│    ✓ validateName(first_name)  → OK                         │
│    ✓ validateName(last_name)   → OK                         │
│    ✓ validateEmail(email)      → OK                         │
│    ✓ validatePassword(password)→ OK                         │
│                                                              │
│ 3. API Request (apiCall)                                    │
│    POST /api/register                                       │
│    Headers: Content-Type: application/json                  │
│    Body: {                                                  │
│      first_name: "Viktor",                                  │
│      last_name: "Schmidt",                                  │
│      email: "viktor@example.com",                           │
│      password: "SecurePass123",                             │
│      role: "user"                                           │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ NETWORK (REST API)                                          │
├─────────────────────────────────────────────────────────────┤
│ HTTP POST to http://localhost:3000/api/register             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ BACKEND (server.js)                                         │
├─────────────────────────────────────────────────────────────┤
│ 1. CORS Middleware                                          │
│    ✓ Origin http://localhost:5173 erlaubt                   │
│                                                              │
│ 2. Body Parser                                              │
│    ✓ JSON geparst → req.body                               │
│                                                              │
│ 3. Input Validierung                                        │
│    ✓ first_name.length >= 2                                 │
│    ✓ Email Regex                                            │
│    ✓ password.length >= 8                                   │
│    ✓ Großbuchstabe + Zahl vorhanden                         │
│                                                              │
│ 4. Passwort Hashing                                         │
│    bcrypt.hash(password, 10)                               │
│    → "$2b$10$abcdef..."                                    │
│                                                              │
│ 5. Database Insert                                          │
│    INSERT INTO users                                        │
│    (first_name, last_name, email, password_hash, role)      │
│    VALUES (...)                                             │
│    RETURNING *                                              │
│                                                              │
│ 6. JWT Token Generierung                                    │
│    jwt.sign({                                               │
│      id: 1,                                                 │
│      email: "viktor@example.com",                           │
│      role: "user"                                           │
│    }, JWT_SECRET, { expiresIn: '7d' })                     │
│    → "eyJhbGciOiJIUzI1NiIs..."                             │
│                                                              │
│ 7. Response                                                 │
│    HTTP 201 Created                                         │
│    {                                                        │
│      message: "Benutzer erfolgreich registriert",           │
│      token: "eyJhbGciOiJIUzI1NiIs...",                     │
│      user: {                                                │
│        id: 1,                                               │
│        first_name: "Viktor",                                │
│        email: "viktor@example.com"                          │
│      }                                                      │
│    }                                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ FRONTEND (Register.tsx - Response Handling)                 │
├─────────────────────────────────────────────────────────────┤
│ 1. Response empfangen                                       │
│    data = { message: "...", token: "...", user: {...} }    │
│                                                              │
│ 2. Token speichern                                          │
│    localStorage.setItem("auth_token", token)               │
│                                                              │
│ 3. Success Toast zeigen                                     │
│    addToast("Registrierung erfolgreich!", "success")        │
│                                                              │
│ 4. Navigation                                               │
│    navigate("/")  → Home Page                               │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 **Login-Flow**

```
User Email/Passwort
    ↓
Frontend Validierung
    ↓
POST /api/login { email, password }
    ↓
Backend: getUsers() + find(email)
    ↓
bcrypt.compare(password, password_hash)
    ↓
JWT.sign() → Token
    ↓
200 OK + Token + User Data
    ↓
localStorage.setItem("auth_token", token)
    ↓
navigate("/")
```

### 5.3 **Protected Request Flow (Users Listing)**

```
Click /users Button
    ↓
GET /api/users
    ↓
Frontend: apiCall() liest Token aus localStorage
    ↓
Header: Authorization: Bearer <token>
    ↓
Backend: authMiddleware prüft Token
    ↓
jwt.verify(token, JWT_SECRET)
    ↓
Token gültig? → Req.user = payload
    ↓
getUsers() aus DB
    ↓
200 OK + Users Array
    ↓
Toast: "Benutzer erfolgreich geladen"
    ↓
Map über Users + Render List
```

---

## 6. Scalability & Zukünftige Verbesserungen

### 6.1 **Heutige Architektur (MVP)**

```
┌─ Single Server ─────────────────┐
│ Frontend + Backend + Database   │
│ localhost Deployment            │
│ Gut für: Entwicklung, Testing   │
└─────────────────────────────────┘
```

### 6.2 **Production-Ready Architektur (Future)**

```
┌──────────────────────────────────────────────────────────┐
│                  CDN / Static Hosting                    │
│         (Frontend: React Build - Static Files)           │
└──────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────┐
│              API Gateway / Load Balancer                 │
│           (Nginx / AWS Load Balancer)                    │
└──────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                  Backend Cluster                        │
│  ┌──────────────┬──────────────┬──────────────┐         │
│  │  Express 1   │  Express 2   │  Express 3   │ (Auto) │
│  │  (Port 3000) │  (Port 3000) │  (Port 3000) │ Scaling│
│  └──────────────┴──────────────┴──────────────┘         │
│                                                          │
│  (Docker Containers, Kubernetes)                       │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Database Cluster                           │
│  ┌─────────────────────────────────────────┐            │
│  │  PostgreSQL Primary (Read/Write)        │            │
│  └─────────────────────────────────────────┘            │
│                 ↓  Replication                          │
│  ┌──────────────┬──────────────┐                        │
│  │ Replica 1    │  Replica 2   │ (Read-Only)            │
│  └──────────────┴──────────────┘                        │
│                                                          │
│  (Backup, Monitoring, High Availability)               │
└─────────────────────────────────────────────────────────┘
```

### 6.3 **Geplante Architektur-Erweiterungen**

```
1. Caching Layer
   ├─ Redis für Session Management
   └─ Cache populäre User Queries

2. Message Queue
   ├─ RabbitMQ / Bull für Email Versand
   └─ Async Task Processing

3. Logging & Monitoring
   ├─ ELK Stack (Elasticsearch, Logstash, Kibana)
   └─ Prometheus + Grafana

4. Security Enhancements
   ├─ OAuth2 / OpenID Connect
   ├─ 2FA (Two-Factor Auth)
   └─ Rate Limiting (API Security)

5. Microservices (Langfristig)
   ├─ Auth Service (separate)
   ├─ User Service (separate)
   └─ Notification Service (separate)
```

---

## 7. Design Patterns verwendet

### 7.1 **Frontend Patterns**

| Pattern | Verwendung | Vorteil |
|---------|-----------|---------|
| **Component Pattern** | React Components | Wiederverwendbarkeit |
| **Container Pattern** | MainLayout, Toast | Composition |
| **Hook Pattern** | useToast, useState | State Abstraction |
| **Utility Pattern** | authUtils.ts | Code Reusability |

### 7.2 **Backend Patterns**

| Pattern | Verwendung | Vorteil |
|---------|-----------|---------|
| **MVC Pattern** | Routes → Models | Separation of Concerns |
| **Middleware Pattern** | CORS, Auth, Parser | Pipeline Processing |
| **Service Pattern** | Auth Service | Business Logic Encapsulation |
| **DAO Pattern** | models/users.js | Data Access Abstraction |

### 7.3 **API Patterns**

| Pattern | Verwendung | Vorteil |
|---------|-----------|---------|
| **REST** | HTTP Methods | Standard, leicht zu verstehen |
| **JSON** | Request/Response | Platform-agnostic |
| **Status Codes** | 200, 201, 400, 401 | Standardisiert |
| **Bearer Token** | Authorization Header | JWT Standard |

---

## 8. Fazit

### **Zusammenfassung der Architektur:**

Diese Anwendungsarchitektur wurde gewählt, weil sie:

1. ✅ **Einfach zu verstehen** - Klare Schichten und Verantwortlichkeiten
2. ✅ **Wartbar** - Code ist organisiert und strukturiert
3. ✅ **Skalierbar** - Komponenten können unabhängig erweitert werden
4. ✅ **Sicher** - JWT, Validierung, Passwort Hashing
5. ✅ **Testbar** - Isolation zwischen Schichten
6. ✅ **Performant** - Asynchrone Operationen, Caching möglich
7. ✅ **Modern** - React, Express, PostgreSQL sind Industry-Standard

### **Technologie-Begründung:**

| Schicht | Technologie | Grund |
|---------|------------|-------|
| Frontend | React + Vite | Component-based, schnelle Dev, große Community |
| Backend | Express.js | Lightweight, Node.js, einfach zu verstehen |
| Database | PostgreSQL | Relational, ACID, reif, open-source |
| Auth | JWT + bcrypt | Stateless, secure, industry-standard |
| Styling | CSS | Einfach, keine Dependencies |

Diese Architektur ist das optimale Balance zwischen **Simplicity** (für Azubi-Projekt) und **Production-Readiness** (für zukünftiges Wachstum).

---

## 📚 Anhang: Ressourcen

- [MVC Pattern Explanation](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller)
- [REST API Design](https://restfulapi.net/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)
- [React Best Practices](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
