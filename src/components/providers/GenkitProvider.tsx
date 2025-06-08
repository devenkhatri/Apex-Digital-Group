"use client";

import type { ReactNode } from 'react';
// The import 'ClientGenkitProvider from @genkit-ai/next/client' has been removed as it was causing errors.

interface GenkitProviderProps {
  children: ReactNode;
}

export default function GenkitProvider({ children }: GenkitProviderProps) {
  // Since the imported ClientGenkitProvider component does not seem to exist,
  // this component will now simply render its children.
  // If Genkit's Next.js integration requires a specific client-side context provider
  // from the library, its name or import path might be different, or it might not be needed here.
  return <>{children}</>;
}
