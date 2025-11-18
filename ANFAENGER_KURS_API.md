# 🚀 Anfänger-Kurs: Frontend mit Backend verbinden

## Was ist eine API?
Eine **API** (Application Programming Interface) ist wie ein Restaurant:
- **Frontend** = Du (Kunde)
- **Backend** = Restaurant (Küche)
- **API** = Kellner (bringt Anfragen und Antworten)

---

## 1. Die Backend-URL

```typescript
const API_URL = "http://localhost:3000";
```

**Was bedeutet das?**
- `http://` = Internetprotokoll (wie man spricht)
- `localhost` = "dieser Computer" 
- `3000` = Der Port (wie Telefonnummer des Restaurants)
- **Auf Deutsch:** "Mein Backend läuft auf diesem Computer, Telefonnummer 3000"

---

## 2. Eine API-Anfrage machen

### ❌ OHNE Helper-Funktion (kompliziert):
```typescript
const response = await fetch("http://localhost:3000/api/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "test@test.de", password: "123" })
});

const data = await response.json();
```

### ✅ MIT Helper-Funktion (einfach):
```typescript
// 1 Zeile statt 10 Zeilen! 🎉
const data = await apiCall("/api/login", {
  method: "POST",
  body: JSON.stringify({ email: "test@test.de", password: "123" })
});
```

---

## 3. Die `apiCall()` Funktion (vereinfacht)

```typescript
// Was ist das?
// Eine Funktion die immer wieder benutzt wird, um zum Backend zu sprechen
// Statt jedes Mal das ganze `fetch` zu schreiben

export async function apiCall(endpoint, options = {}) {
  // endpoint = "/api/login"
  // options = { method: "POST", body: ... }

  const response = await fetch(`${API_URL}${endpoint}`, options);
  
  // Wenn Fehler, nächste Seite anzeigen
  if (!response.ok) {
    throw new Error("API Request fehlgeschlagen");
  }

  // Gib mir die Daten zurück
  return response.json();
}
```

**Wie funktioniert das?**
1. `fetch()` = Sprich mit dem Backend
2. `response.json()` = Wandle Antwort in JavaScript-Objekt um
3. `return` = Gib das Ergebnis zurück

---

## 4. Praktische Beispiele

### Login
```typescript
const response = await apiCall("/api/login", {
  method: "POST",
  body: JSON.stringify({ 
    email: "ich@beispiel.de", 
    password: "mein_passwort" 
  })
});

console.log(response); // { token: "abc123", user: { name: "Viktor" } }
```

### Benutzer abrufen
```typescript
const users = await apiCall("/api/users", { 
  method: "GET" 
});

console.log(users); // [{ id: 1, name: "Anna" }, { id: 2, name: "Bob" }]
```

### Neuer Benutzer registrieren
```typescript
const newUser = await apiCall("/api/register", {
  method: "POST",
  body: JSON.stringify({
    first_name: "Viktor",
    last_name: "Lamasz",
    email: "viktor@test.de",
    password: "sicher123"
  })
});

console.log(newUser); // { id: 1, token: "xyz789" }
```

---

## 5. Was sind die ganzen anderen Funktionen?

Schaue dir `src/utils/authUtils.ts` an:

### `saveToken(token)` - Token speichern
```typescript
// Nach Login: Token speichern
saveToken("abc123xyz");
// Später beim Browser neu öffnen: Token ist noch da!
```

### `getToken()` - Token holen
```typescript
const token = getToken();
// Gibt: "abc123xyz" zurück (aus localStorage)
```

### `clearToken()` - Logout
```typescript
// Beim Logout: Token löschen
clearToken();
// Jetzt: Automatisch zu /login seite springen
```

---

## 6. Der komplette Fluss

```
1. User schreibt Email + Passwort
   ↓
2. Frontend ruft apiCall("/api/login") auf
   ↓
3. Backend prüft Email + Passwort in der Datenbank
   ↓
4. Wenn richtig: Backend sendet Token zurück
   ↓
5. Frontend speichert Token mit saveToken()
   ↓
6. Frontend springt zu Dashboard
```

---

## 7. Wichtige Begriffe

| Wort | Bedeutung |
|------|-----------|
| **API** | Schnittstelle zwischen Frontend und Backend |
| **Endpoint** | `/api/login`, `/api/register` (Adressen) |
| **HTTP Method** | GET (abrufen), POST (senden), PUT (ändern), DELETE (löschen) |
| **JSON** | Austausch-Format { key: "value" } |
| **Token** | Beweis dass du angemeldet bist |
| **localStorage** | Speicher im Browser (vergessen nicht wenn du den Browser schließt) |

---

## 8. Checkliste - Das musst du wissen:

- ✅ API verbindet Frontend mit Backend
- ✅ `apiCall()` macht die Anfrage einfacher
- ✅ Backend läuft auf `http://localhost:3000`
- ✅ Token speichern = "Ich bin angemeldet"
- ✅ GET = Daten abrufen
- ✅ POST = Neue Daten senden

---

**Fragen?** 🤔 Schreib mir!
