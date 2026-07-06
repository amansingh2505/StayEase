import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer
  id="footer"
  className="mt-20 border-t border-slate-200 bg-white"
>
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-4">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              StayEase
            </h2>

            <p className="mt-4 leading-7 text-slate-500">
              Discover luxury hotels, premium stays and unforgettable travel
              experiences across India.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              Company
            </h3>

            <ul className="space-y-3 text-slate-500">
              <li className="cursor-pointer hover:text-slate-800">
                About Us
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Careers
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Blog
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Contact
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              Support
            </h3>

            <ul className="space-y-3 text-slate-500">
              <li className="cursor-pointer hover:text-slate-800">
                Help Center
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Cancellation
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Privacy Policy
              </li>
              <li className="cursor-pointer hover:text-slate-800">
                Terms & Conditions
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-semibold text-slate-800">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-800 hover:text-white">
                <FaFacebookF />
              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-800 hover:text-white">
                <FaInstagram />
              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-800 hover:text-white">
                <FaTwitter />
              </div>

              <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-100 transition hover:bg-slate-800 hover:text-white">
                <FaLinkedinIn />
              </div>

            </div>

            <p className="mt-6 text-sm text-slate-500">
              support@stayease.com
            </p>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © 2026 StayEase. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;