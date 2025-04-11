// components/FAB.tsx
import { useNavigate } from 'react-router-dom';
import { BsPencil } from "react-icons/bs";
import { useEffect } from 'react';

const FAB = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("FAB mounted");
    return () => {
      console.log("FAB unmounted");
    };
  }, []);

  return (
    <button
    aria-label="Add Blog"
    title="Add Blog"
    onClick={() => navigate('/add-blog')}
    className="fixed bottom-26 right-12 btn btn-primary text-base-100 p-4 rounded-full shadow-lg hover:brightness-110 transition"
  >
    
    <BsPencil className="w-6 h-6" />
  </button>
  );
};

export default FAB;
