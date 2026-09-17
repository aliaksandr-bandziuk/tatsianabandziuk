import { ReactNode } from "react";

// The real <html>/<body> live in [lang]/layout.tsx and admin/layout.tsx.
const Layout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default Layout;
