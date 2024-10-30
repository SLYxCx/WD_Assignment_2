import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import FindModifyStudent from "./components/FindModifyStudent";
import Navbar from "./components/Navbar";

export default function Home({ searchParams }) {
  const activeComponent = searchParams?.view || "view";

  const renderComponent = () => {
    switch (activeComponent) {
      case "add":
        return <AddStudent />;
      case "find":
        return <FindModifyStudent />;
      default:
        return <StudentList />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar activeComponent={activeComponent} />

      {/* Main Content */}
      <main className="flex-grow p-8 text-center flex justify-center items-center ">
        {renderComponent()}
      </main>

      {/* Footer */}
      <footer className="text-center p-4 bg-green-600 text-white">
        <p>&copy; New Generation High School</p>
      </footer>
    </div>
  );
}