import React from "react";
import Image from "next/image";

const requests = [
  {
    id: 1,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 2,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 3,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 4,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 5,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
  {
    id: 6,
    studentName: "Ilham Qadalov",
    subject: "Chemistry",
  },
];

const Requests = () => {
  return (
    <div className="grid grid-cols-1 xxl:grid-cols-2 flex-1 xxl:flex-2 gap-[12px]">
      {requests.map((req) => (
        <div key={req.id} className="border border-gray-light">
          <div className="flex gap-[20px] items-center p-[20px] border-b border-gray-light">
            <Image
              src={"./user.svg"}
              width={54}
              height={54}
              alt="user"
              className="bg-gray-light rounded-full p-[12px]"
            />
            <div>
              <div className="text-secondary text-[20px] mb-[12px]">
                {req.studentName} wants to join group
              </div>
              <div className="text-[#626262]">{req.subject}</div>
            </div>
          </div>
          <div className="flex justify-between text-center items-center cursor-pointer">
            <div className="text-secondary flex-1 py-[19px] border-r border-gray-light">
              Accept
            </div>
            <div className="text-[#CB0000] flex-1 py-[19px]">Decline</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;
