'use client';
import React, { useMemo, useState } from 'react';
import { roboto } from '@/app/ui/fonts';
import SelectYear from './select-year';

const Dashboard = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const showLastYear = now.getMonth() <= 2; // 0=Jan, 1=Feb, 2=Mar

  const years = useMemo(
    () => showLastYear ? [currentYear, currentYear - 1] : [currentYear],
    [currentYear, showLastYear]
  );

  const [selectedYear, setSelectedYear] = useState(years[0]);

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <div className={`mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-4 ${roboto.className}`}>
        <SelectYear selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        <div>Select Survey</div>
        <div>View old surveys</div>
      </div>
    </div>
  );
};

export default Dashboard;