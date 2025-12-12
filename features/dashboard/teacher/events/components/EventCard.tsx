"use client";
import { EventCardTypes } from "../types/eventTypes";
import Image from "next/image";
import Link from "next/link";
import { useDeleteGroupMutation } from "@/features/group-details/api/groupDetailsApi";
import { useState } from "react";

const EventCard = ({
  groupId,
  time,
  endTime,
  isActive,
  subjectName,
  studentNumber,
  startUrl,
}: EventCardTypes) => {
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Check if current time is between startTime and endTime
  const isWithinTimeRange = () => {
    // If endTime is not available, always allow access (backward compatibility)
    if (!endTime) return true;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes

    // Parse start time (format: "HH:MM")
    const [startHour, startMinute] = time.split(':').map(Number);
    const startMinutes = startHour * 60 + startMinute;

    // Parse end time (format: "HH:MM")
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endMinutes = endHour * 60 + endMinute;

    return currentTime >= startMinutes && currentTime <= endMinutes;
  };

  const canStartLesson = isActive && startUrl && isWithinTimeRange();

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    try {
      await deleteGroup(groupId).unwrap();
      console.log("Group deleted successfully");
    } catch (error) {
      console.error("Failed to delete group:", error);
      alert("Failed to delete group. Please try again.");
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="w-full h-[270px] p-[24px] border border-gray-light lg:h-[169px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[6px]">
          <Image width={22} height={22} src={"/clock.svg"} alt="" />
          <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
            {endTime ? `${time} - ${endTime}` : time}
          </span>
        </div>
        <span className="text-secondary leading-[100%] tracking-[0%] font-normal">
          {isActive ? "active" : "not active"}
        </span>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[6px] mt-5 mb-19 lg:mb-0 lg:mt-12">
          <Link href={`/groups/${groupId}`}>
            <h3 className="text-[22px] text-primary leading-[100%] tracking-[0%] hover:underline cursor-pointer">
              {subjectName}
            </h3>
          </Link>
          <div className="flex gap-[4px] items-center">
            <Image
              width={20}
              height={20}
              src={"/users-1.svg"}
              alt=""
              className="text-secondary"
            />
            <span className="text-tertiary">{studentNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-[12px] lg:mt-12 lg:flex-row-reverse">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="w-[46px] h-[46px] border border-gray-light flex items-center justify-center hover:bg-red-50 disabled:opacity-50"
          >
            <Image width={22} height={22} src={"/trash-2.svg"} alt="delete" />
          </button>
          <Link href={`edit-group/${groupId}`}>
            <button className="w-[46px] h-[46px] border border-gray-light flex items-center justify-center hover:bg-gray-50">
              <Image width={22} height={22} src={"/edit-2.svg"} alt="edit" />
            </button>
          </Link>
          {canStartLesson ? (
            <a href={startUrl} target="_blank" rel="noopener noreferrer">
              <button className="h-[46px] w-[186px] bg-secondary text-white hover:bg-secondary/90">
                Start Lesson
              </button>
            </a>
          ) : (
            <Link
              href={`/groups/${groupId}`}
              className={`flex items-center justify-center h-[46px] w-[186px] bg-secondary text-white disabled:opacity-50`}
            >
              View Details
            </Link>
          )}
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this group? This action cannot be undone.</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
