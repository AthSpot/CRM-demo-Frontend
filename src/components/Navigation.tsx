import { useLocation } from "react-router-dom";

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-6 flex justify-around items-center z-50">
        </nav>
    );
};

export default Navigation;