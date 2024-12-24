import Header from "./component/Header/Header";
import "./globals.css";
import ClientLayout from "./ClientLayout"
import { ToastContainer } from 'react-toastify';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="container">
        <ClientLayout>
        <Header/>
        {children}
        <ToastContainer/>
        </ClientLayout>
      </body>
    </html>
  );
}
