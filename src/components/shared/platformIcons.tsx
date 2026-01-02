import { JSX } from "@emotion/react/jsx-runtime";
import {
  FaFacebook,
  FaGoogle,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

export const platformIcons: Record<string, JSX.Element> = {
  facebook: <FaFacebook className="text-blue-600" />,
  google: <FaGoogle className="text-red-500" />,
  twitter: <FaTwitter className="text-sky-500" />,
  linkedin: <FaLinkedin className="text-blue-700" />,
  instagram: <FaInstagram className="text-pink-500" />,
  meta: <FaFacebook className="text-blue-600" />,
  other: <span className="text-gray-500">🌐</span>,

};

