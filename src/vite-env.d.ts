/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_GOOGLE_CLIENT_ID: string;
  readonly VITE_PUBLIC_FACEBOOK_APP_ID: string;
  readonly VITE_PUBLIC_LINKEDIN_CLIENT_ID: string;
  readonly VITE_PUBLIC_APPLE_CLIENT_ID: string;
  readonly VITE_PUBLIC_APPLE_REDIRECT_URL: string;
  readonly VITE_PUBLIC_STATE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
