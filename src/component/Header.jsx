import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <>
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        <DesktopHeader />
      </div>
    </>
  );
};

export default Header;