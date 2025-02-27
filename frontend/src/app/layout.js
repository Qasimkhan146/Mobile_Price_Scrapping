import Header from "./component/Header/Header";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./component/Footer/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="ho_6W9tE2RrM-n84QJrWb2H9ksMz664OSCbcb8x30QU"
        />
      </head>
      <body className="container">
        <ClientLayout>
          <Header />
          {children}
          <ToastContainer />
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
