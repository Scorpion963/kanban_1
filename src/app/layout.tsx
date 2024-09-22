import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ThemeProvider } from "~/components/theme-provider";
import Sidebar from "~/components/Sidebar";
import { SidebarMain } from "~/components/SidebarMain";
import { TasksProvider } from "~/hooks/TasksProvider";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TasksProvider>
            <div className="flex">
              <Sidebar>
                <SidebarMain />
              </Sidebar>
              {children}
            </div>
          </TasksProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
