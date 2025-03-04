"use client";
import { useState } from "react";

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Which are the best Apple Mobile Phones in Pakistan?",
      answer:
        "The best Apple Mobile Phones in Pakistan include the iPhone 16 Plus (PKR 370,499), iPhone 16 Pro Max (PKR 369,999) and Apple iPad Pro 13 (2024) (PKR 351,899).",
    },
    {
      question: "Which are the cheapest Apple Mobile Phones in Pakistan?",
      answer:
        "The most affordable Apple Mobile Phones in Pakistan are the iPhone 11 (PKR 69,999), iPad 10 Generation (2022) (PKR 102,899) and iPhone 12 (PKR 133,999).",
    },
    {
      question: "Which are the latest Apple Mobile Phones in Pakistan?",
      answer:
        "The latest Apple Mobile Phones in Pakistan include the iPad mini 7 (2024) (PKR 140,999), iPhone 16 Pro Max (PKR 369,999) and iPhone 16 Pro (PKR 349,999).",
    },
    {
      question: "Which Apple Mobile Phones in Pakistan are good for photography?",
      answer:
        "For photography enthusiasts, the ideal Apple Mobile Phones in Pakistan are the iPhone 15 Pro (PKR 313,999), iPhone 15 Pro Max (PKR 339,999) and iPhone 15 (PKR 223,999).",
    },
    {
      question: "Which Apple Mobile Phones in Pakistan have the largest display?",
      answer:
        "The Apple iPad Pro 13 (2024) (PKR 351,899), Apple iPad Air 13 (2024) (PKR 224,999) and iPad Pro 12.9 (2022) (PKR 281,999) are the top Apple Mobile Phones in Pakistan with the largest display size.",
    },
    {
      question: "Which Apple Mobile Phones in Pakistan have the highest battery capacity?",
      answer:
        "For those prioritizing battery life, the leading Apple Mobile Phones in Pakistan are the iPad Pro 12.9 (2022) (PKR 281,999), Apple iPad Pro 13 (2024) (PKR 351,899) and Apple iPad Pro 11 (2024) (PKR 237,999).",
    },
    {
      question: "What is the latest Apple New Model Mobile price in Pakistan?",
      answer:
        "The latest Apple mobile phone model released in Pakistan is the iPad mini 7 (2024), priced at PKR 140,999. It features 8 GB RAM and 128 GB, 256 GB, 512 GB storage.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">
        📌 Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[#1eb8db] mb-4 cursor-pointer"
          >
            <div
              className="flex justify-between items-center p-4 bg-[#fefaf6] rounded-lg shadow-md hover:bg-[#1eb8db] hover:text-white transition duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">
                {openIndex === index ? "➖" : "➕"}
              </span>
            </div>

            {openIndex === index && (
              <div className="p-4 bg-white rounded-b-lg shadow-md text-sm font-poppins">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
