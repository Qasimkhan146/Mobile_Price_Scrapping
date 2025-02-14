import Header from "./component/Header/Header";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { ToastContainer } from "react-toastify";
import Script from "next/script"; // Import the Script component
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
        {/* Add Google Analytics Scripts */}
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-1111111`}
        />
        <Script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-2NFWB379HP');
          `}
        </Script>

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
