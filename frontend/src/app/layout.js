import Header from "./component/Header/Header";
import "./globals.css";
import ClientLayout from "./ClientLayout"
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./component/Footer/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <ClientLayout>
        <Header/>
        {children}
        <ToastContainer/>
        <Footer/>
        </ClientLayout>
      </body>
    </html>
  );
}
