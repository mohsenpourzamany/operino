import Navbar from "./Navbar";

const Header = () => {
  return (
    <div>
      <Navbar
        onItemClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default Header;
