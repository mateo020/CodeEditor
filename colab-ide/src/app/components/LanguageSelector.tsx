import React from "react";
import { LANGUAGE_VERSIONS } from "../constants/constants";

const Languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#3182ce"; // Equivalent to Chakra's blue.400

type Language = keyof typeof LANGUAGE_VERSIONS;

interface LanguageSelectorProps {
  language: Language;
  onSelect: (language: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onSelect }) => {
  return (
    <div style={{ marginLeft: "8px", marginBottom: "16px" }}>
      <label style={{ marginBottom: "8px", fontSize: "18px" }}>Language:</label>
      <div className="menu">
        <button className="menu-button">{language}</button>
        <ul className="menu-list">
          {Languages.map(([lan, version]) => (
            <li
              key={lan}
              className={`menu-item ${lan === language ? "active" : ""}`}
              onClick={() => onSelect(lan as Language)}
            >
              {lan} <span>({version})</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .menu {
          position: relative;
          display: inline-block;
        }

        .menu-button {
          background-color: #3182ce;
          color: white;
          padding: 8px 16px;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }

        .menu-list {
          display: none;
          position: absolute;
          background-color: #110c1b;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
          z-index: 1;
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .menu-button:hover + .menu-list,
        .menu-list:hover {
          display: block;
        }

        .menu-item {
          color: white;
          padding: 12px 16px;
          cursor: pointer;
        }

        .menu-item:hover {
          background-color: #2d3748; // Equivalent to grey.700
        }

        .menu-item.active {
          color: ${ACTIVE_COLOR};
          background-color: #1a202c; // Equivalent to grey.900
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector;
