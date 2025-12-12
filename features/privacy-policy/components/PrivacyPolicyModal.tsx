"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { privacyPolicyMetadata, privacyPolicySections } from '../data/privacyPolicyData';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal = ({ isOpen, onClose }: PrivacyPolicyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white w-[90vw] max-w-[800px] h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-[24px] border-b border-gray-light">
          <h2 className="text-primary text-[24px] lg:text-[32px] font-semibold leading-[130%]">
            Terms and Conditions & Privacy Policy
          </h2>
          <button
            onClick={onClose}
            className="w-[32px] h-[32px] flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <Image
              src="/close.svg"
              width={24}
              height={24}
              alt="Close"
            />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          <p className="text-gray-500 text-center text-[14px] lg:text-[16px] mb-6">
            Last Updated: {privacyPolicyMetadata.lastUpdated}
          </p>

          <div className="space-y-6">
            {privacyPolicySections.map((section) => (
              <div
                key={section.id}
                className="border-b border-gray-light pb-4 last:border-b-0"
              >
                <h3 className="text-primary text-[18px] lg:text-[22px] font-semibold mb-2 leading-[120%]">
                  {section.id}. {section.title}
                </h3>

                {section.content && (
                  <p className="text-secondary leading-[160%] text-[14px] lg:text-[16px] mb-2">
                    {section.content}
                    {section.link && (
                      <Link
                        href={section.link.href}
                        className="text-secondary underline hover:text-primary transition-colors"
                      >
                        {section.link.text}
                      </Link>
                    )}
                  </p>
                )}

                {section.items && (
                  <ul className="list-none space-y-1 ml-0">
                    {section.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-secondary leading-[160%] text-[14px] lg:text-[16px] flex items-start"
                      >
                        <span className="text-secondary mr-2 mt-1 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="text-secondary leading-[160%] text-[14px] lg:text-[16px] mt-2 italic">
                    {section.footer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Acceptance Notice */}
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-secondary">
            <p className="text-secondary text-[13px] lg:text-[15px] leading-[150%]">
              <strong>Important:</strong> By using BridgeSpero, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions and Privacy Policy.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-[24px] border-t border-gray-light flex justify-end">
          <button
            onClick={onClose}
            className="text-[16px] lg:text-[18px] text-custom-white bg-secondary py-[12px] px-[30px] hover:opacity-90 transition-opacity"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
