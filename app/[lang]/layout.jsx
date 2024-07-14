import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import DictionaryProvider from "@/providers/dictionary-provider";
import { getLangs } from "@/lib/langs";
import AuthProvider from "@/providers/auth-provider";

const vazir = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  // title: "بی باک سفر",
  title: "8887908",
  description: "بی باک سفر",
};

const RootLayout = async ({ children, params }) => {
  const dictionary = await getLangs(params.lang);

  return (
    <html
      lang={params.lang}
      dir={params.lang === "en-us" || params.lang === "en" ? "ltr" : "rtl"}
    >
      <body className={vazir.className}>
        <DictionaryProvider dictionary={dictionary}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              {children}
              <Toaster position="bottom-right" />
            </AuthProvider>
          </ThemeProvider>
        </DictionaryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
