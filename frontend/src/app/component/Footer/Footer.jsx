import "./Footer.css";
import Logo from "../../../../public/images/MOBILE PRI.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footer text-center d-flex justify-content-around">
      <Link href="/">
        {" "}
        <Image
          src={Logo}
          className="logoImg"
          alt="logo"
          width={100}
          height={50}
        />{" "}
      </Link>
      <Link href="/" className="pt-2">Contact Us</Link>
    </div>
  );
};
export default Footer;
