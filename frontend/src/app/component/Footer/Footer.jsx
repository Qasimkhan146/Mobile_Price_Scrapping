"use client";
import "./Footer.css";
import Logo from "../../../../public/images/MOBILE PRI.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#fefaf6] py-10 px-6 md:px-12 text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">

        {/* ✅ Logo Section */}
        <div>
          <Link href="/" className="flex justify-center md:justify-start">
            <Image
              src={Logo}
              alt="Logo"
              width={120}
              height={60}
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* ✅ Text Section */}
        <div className="text-sm text-gray-600 leading-6 font-poppins">
          Discover the latest prices of popular mobile phones in Pakistan.
          Stay informed about the newest smartphone releases and their prices
          from top brands like <span className="text-[#1eb8db] font-bold">
            Apple, Samsung, Oppo, vivo, Xiaomi
          </span>, and more.
        </div>

        {/* ✅ Contact Us Section */}
        <div>
          <Link
            href="/Contact-Us"
            className="bg-[#1eb8db] text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition-all duration-300 text-sm font-semibold"
          >
            📞 Contact Us
          </Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-300 pt-4 text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Mobile Prices. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
