# LoginApplication

A simple and modern authentication system built with **Next.js** and **Firebase Authentication** (email/password).  
Users can sign up, log in, choose “Remember me” (persistent login), and are redirected to a home page on success.

## 🔍 Features

- Sign up with full name, email & password  
- Sign in for existing users  
- “Remember me” persistence (local or session)  
- Friendly form validation and error messages  
- Password strength indicator on sign up  
- Clean UI built with TailwindCSS (custom properties for easy theming)  
- Next.js App Router (`app/` directory) + client components where needed  
- Simple architecture: UI component (`LoginForm`) + custom hook (`useAuthForm`) for logic separation  

## 🚀 Getting Started

### 1. Clone the repository  
```bash
git clone https://github.com/COR1999/loginApplication.git
cd loginApplication
```

### 2. Install dependencies  
```bash
npm install
```

### 3. Setup Firebase  
- Go to the Firebase Console and create a new project  
- Enable the Email/Password sign‑in method  
- Add a web app and copy the config  
- Create `lib/firebase.ts` with initialization code  

### 4. Run the development server  
```bash
npm run dev
```

### 5. Build & Deploy  
```bash
npm run build
npm run start
```

## 🧩 Code Overview

- `hooks/useAuthForm.ts` — handles authentication logic  
- `components/LoginForm.tsx` — UI form, password strength  
- `app/home/page.tsx` — home page greeting + logout  
- `lib/firebase.ts` — Firebase setup  

## ✅ Interviewer Highlights

- Separation of UI + logic  
- Firebase persistence  
- Strong validation + UX improvements  
- Clean architecture  

## 📄 License  
Open-source — modify freely.
