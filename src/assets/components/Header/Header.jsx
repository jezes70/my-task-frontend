import { Headers, LogoDiv, H1, PerfectLine } from "../Styled/Styled";
import NavBar from "./NavBar";
import { useState, useEffect } from "react";
function Header(prop) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Headers className={isScrolled ? "fixed-header" : ""}>
        <PerfectLine>
          <LogoDiv>
            <H1 style={{ fontSize: "20px" }}>Task Assessment</H1>
          </LogoDiv>
          {prop.navbar.length > 0 ? <NavBar items={prop.navbar} /> : ""}
        </PerfectLine>
      </Headers>
    </>
  );
}

export default Header;
