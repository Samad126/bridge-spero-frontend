"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  useAcceptJoinRequestMutation,
  useDeclineJoinRequestMutation,
} from "@/features/notifications/api/notificationsApi";
import { JoinNotification } from "@/features/notifications/types/notificationTypes";
import { handleApiError } from "@/lib/utils/errorDisplay";

interface RequestsProps {
  requests: JoinNotification[];
}

const Requests = ({ requests }: RequestsProps) => {
  const [acceptRequest, { isLoading: isAccepting }] = useAcceptJoinRequestMutation();
  const [declineRequest, { isLoading: isDeclining }] = useDeclineJoinRequestMutation();
  const [processingId, setProcessingId] = useState<number | null>(null);

  const handleAccept = async (requestId: number) => {
    setProcessingId(requestId);
    try {
      await acceptRequest(requestId).unwrap();
      console.log("Request accepted successfully");
    } catch (error) {
      handleApiError(error, "Accept Request");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDecline = async (requestId: number) => {
    setProcessingId(requestId);
    try {
      await declineRequest(requestId).unwrap();
      console.log("Request declined successfully");
    } catch (error) {
      handleApiError(error, "Decline Request");
    } finally {
      setProcessingId(null);
    }
  };

  if (requests.length === 0) {
    return (
      <div className="grid grid-cols-1 xxl:grid-cols-2 flex-1 xxl:flex-2 gap-[12px]">
        <div className="border border-gray-light p-[40px] text-center text-secondary col-span-full">
          No pending requests
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xxl:grid-cols-2 flex-1 xxl:flex-2 gap-[12px]">
      {requests.map((req) => (
        <div key={req.id} className="border border-gray-light">
          <div className="flex gap-[20px] items-center p-[20px] border-b border-gray-light">
            <Image
              src={"/user.svg"}
              width={54}
              height={54}
              alt="user"
              className="bg-gray-light rounded-full p-[12px]"
            />
            <div>
              <div className="text-secondary text-[20px] mb-[12px]">
                {req.studentName} {req.studentsSurname} wants to join group
              </div>
              <div className="text-[#626262]">{req.groupName}</div>
            </div>
          </div>
          <div className="flex justify-between text-center items-center">
            <button
              onClick={() => handleAccept(req.id)}
              disabled={processingId === req.id || isAccepting || isDeclining}
              className="text-secondary flex-1 py-[19px] border-r border-gray-light hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {processingId === req.id && isAccepting ? "Accepting..." : "Accept"}
            </button>
            <button
              onClick={() => handleDecline(req.id)}
              disabled={processingId === req.id || isAccepting || isDeclining}
              className="text-[#CB0000] flex-1 py-[19px] hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {processingId === req.id && isDeclining ? "Declining..." : "Decline"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
