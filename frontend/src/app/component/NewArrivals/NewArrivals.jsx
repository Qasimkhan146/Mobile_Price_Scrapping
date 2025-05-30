"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewArrivalMobiles,
  selectNewArrivalMobiles,
} from "../../../../redux/mobileSlicer";
import { useEffect, useState } from "react";
import Link from "next/link";

const NewArrivals = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectNewArrivalMobiles);
  console.log("products",products);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    dispatch(fetchNewArrivalMobiles());
  }, [dispatch]);

  return (
    <section className="py-12">
      <h2 className="font-poppins text-3xl font-bold mb-10">New Arrivals</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="relative bg-[#fefaf6] rounded-[10px] pt-2 px-1 custom-shape shadow-lg "
          >
            {/* Price on other Website Badge with Dropdown on Hover */}
            <div className="absolute top-3 right-4 group">
              <span className="font-poppins bg-[#1eb8db] hover:bg-yellow-500 transition-all duration-300 text-white text-sm px-3 py-1 rounded cursor-pointer">
                Price on other web
              </span>

              {/* Dropdown on Hover */}
              <div className="hidden group-hover:block absolute top-8 left-0 w-[180px] bg-white shadow-lg rounded-lg p-2 z-20">
                <ul className="text-black text-sm">
                  <li className="py-1 border-b">
                    <span className="font-bold text-[#1eb8db]">
                      Whatmobile:
                    </span>{" "}
                    PKR {product.whatmobile_price}
                  </li>
                  <li className="py-1 border-b">
                    <span className="font-bold text-[#1eb8db]">Daraz:</span> PKR{" "}
                    {product.daraz_price}
                  </li>
                  <li className="py-1">
                    <span className="font-bold text-[#1eb8db]">PriceOye:</span>{" "}
                    PKR {product.priceoye_price}
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-row">
              {/* Product Image */}
              <Image
                src={product.img_url_mobilemate}
                alt={product.model}
                width={100}
                height={100}
                className="rounded-lg mb-4 h-30 w-30"
              />
              <div className="mt-[33px]">
                {/* Product Model */}
                <h3 className="font-poppins text-sm">
                  <span className="font-bold">Model:</span> {product.model}
                </h3>

                {/* Product Price */}
                <div className="font-poppins flex items-center gap-2 mt-2">
                  <span className="text-sm Medium text-black">
                    PKR: {product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* View Button */}
            <Link  href={`/Mobile/${product.model.replace(/\s+/g, '-')}`} className="font-poppins text-sm absolute bottom-7 right-4 bg-[#1eb8db] text-white px-2 py-1 rounded-full hover:bg-yellow-500 transition-all duration-300">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
