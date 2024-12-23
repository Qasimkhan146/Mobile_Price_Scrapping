import Header from "./component/Header/Header";
import "./globals.css";
import ClientLayout from "./ClientLayout"
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <ClientLayout>
        <Header/>
        {children}
        </ClientLayout>
      </body>
    </html>
  );
}
