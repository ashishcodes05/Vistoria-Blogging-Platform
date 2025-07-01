import React from "react";

const Footer = () => {
  const linkSections = [
    {
      title: "Quick Links",
      links: ["Home", "Blogs", "Tech", "Lifestyle", "Contact"],
    },
    {
      title: "Resources",
      links: [
        "About Vistoria",
        "Privacy Policy",
        "Terms & Conditions",
        "Subscribe",
        "Help Center",
      ],
    },
    {
      title: "Follow Us",
      links: ["Instagram", "Twitter", "LinkedIn", "YouTube"],
    },
  ];

  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 bg-gray-100 static bottom-0 left-0 w-full">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-300 text-gray-600">
        {/* Logo and Description */}
        <div className="flex flex-col items-start w-full md:w-[40%]">
          <div
            onClick={() => navigate("/")}
            className="logo-container flex items-center gap-2"
          >
            <img src="/logo.png" alt="Logo" className="w-8 sm:w-10" />
            <h1 className="text-2xl font-bold text-[#1770FF]">Vistoria</h1>
          </div>
          <p className="max-w-[420px] mt-6">
            Vistoria is your gateway to a world of ideas — where stories,
            thoughts, and discoveries come together. Fuel your curiosity, one
            post at a time.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 mb-2 md:mb-5">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:underline transition-all duration-200 ease-in-out"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Note */}
      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()} Vistoria. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
