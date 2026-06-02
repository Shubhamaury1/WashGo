import Navbar from "../components/navbar/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div>
      {/* Common Navbar */}
      <Navbar />

      {/* Page Content */}
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
