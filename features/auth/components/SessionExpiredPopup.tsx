"use client";

import { setSessionExpiredPopup } from "@/features/auth/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { useRouter } from "next/navigation";

export default function SessionExpiredPopup() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const showPopup = useAppSelector((state) => state.auth.sessionExpiredPopup);

  if (!showPopup) return null;

  const handleLogin = () => {
    dispatch(setSessionExpiredPopup(false));
    router.push("/login");
  };

  const handleStayLoggedOff = () => {
    dispatch(setSessionExpiredPopup(false));

    fetch("/api/logout", {
      method: "POST",
    }).then(() => {});

    router.refresh();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-99">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
        <p className="text-gray-600 mb-6">
          Your session has expired. Would you like to log in again?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleLogin}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Log In
          </button>
          <button
            onClick={handleStayLoggedOff}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Stay Logged Off
          </button>
        </div>
      </div>
    </div>
  );
}
