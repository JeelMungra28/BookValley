/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_AUTH_TOKEN_KEY: string
    readonly VITE_USER_KEY: string
    readonly VITE_ENABLE_ANALYTICS: string
    readonly VITE_ENABLE_DEBUG_MODE: string
    readonly VITE_APP_NAME: string
    readonly VITE_APP_VERSION: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
} 