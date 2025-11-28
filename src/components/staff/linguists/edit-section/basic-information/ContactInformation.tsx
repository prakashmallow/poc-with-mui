"use client";

import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  BorderColorOutlined as BorderColorOutlinedIcon,
} from '@mui/icons-material';

const ContactInformation: React.FC = () => {
  return (
    <>
      <Paper elevation={0} sx={{mt: 2, p: 4, borderRadius: 2, bgcolor: 'white' }}>
        <Typography sx={{ color: '#1e285f' }}>
          Contact Information
        </Typography>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: 'white', mt: 4 }}>
        <table className="w-full border-collapse">
          {/* Header */}
          <thead>
            <tr className="bg-[#f0efeb] font-small text-sm">
              <th className="text-left p-4">Type</th>
              <th className="text-left p-4">Detail</th>
              <th className="text-left p-4">Verification</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-[#1b2451]">
            {/* Row 1 */}
            <tr className="hover:bg-black/5 transition cursor-pointer">
              <td className="p-4">Mobile</td>
              <td className="p-4">+91 9876543212 <span className="text-orange-500">(Not Verified)</span></td>
              <td className="p-4">
                <button className="border border-[#1b2451] text-[#1b2451] px-2 py-1 rounded hover:bg-black/5 transition">
                  Verify
                </button>
              </td>
              <td className="p-4">
                <button className="border border-[#1b2451] text-[#1b2451] px-2 py-1 rounded flex items-center gap-1 hover:bg-black/5 transition">
                  <BorderColorOutlinedIcon fontSize="small" /> Edit
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-black/5 transition cursor-pointer">
              <td className="p-4">Email</td>
              <td className="p-4">moniga@example.com <span className="text-green-600">Verified</span></td>
              <td className="p-4"></td>
              <td className="p-4">
                <button className="border border-[#1b2451] text-[#1b2451] px-2 py-1 rounded flex items-center gap-1 hover:bg-black/5 transition">
                  <BorderColorOutlinedIcon fontSize="small" /> Edit
                </button>
              </td>
            </tr>

            {/* Row 3 */}
            <tr className="hover:bg-black/5 transition cursor-pointer">
              <td className="p-4">Home Telephone</td>
              <td className="p-4">1234567</td>
              <td className="p-4 text-gray-500">NA</td>
              <td className="p-4">
                <button className="border border-[#1b2451] text-[#1b2451] px-2 py-1 rounded flex items-center gap-1 hover:bg-black/5 transition">
                  <BorderColorOutlinedIcon fontSize="small" /> Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </Paper>
    </>
  );
};

export default ContactInformation;

