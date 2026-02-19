import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


export default function VerifyEmail() {
  const { uid, token } = useParams();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    axios.get(`http://localhost:8000/api/volunteers/activate/${uid}/${token}/`)
      .then(() => {
        setMessage("Your email has been verified! You can now log in.");
      })
      .catch(() => {
        setMessage("Invalid or expired verification link.");
      });
  }, [uid, token]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
