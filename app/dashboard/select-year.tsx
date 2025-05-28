'use client';

import { useMemo } from "react";
import { roboto } from '@/app/ui/fonts';

const SelectYear = ({selectedYear, setSelectedYear}: {selectedYear: number; setSelectedYear: (year: number) => void}) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const showLastYear = now.getMonth() <= 2; // 0=Jan, 1=Feb, 2=Mar

    const years = useMemo(
        () => showLastYear ? [currentYear, currentYear - 1] : [currentYear],
        [currentYear, showLastYear]
    );

   return (
       <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
         <div className={`mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-4 ${roboto.className}`}>
           <label htmlFor="survey-year" className="block text-xs font-medium text-gray-900 mb-1">
             Select Survey Year
           </label>
           <div className="relative">
             <select
               id="survey-year"
               className="block w-full rounded-md border border-gray-200 py-2 pl-3 pr-8 text-sm text-blue-900 bg-white focus:border-blue-900 focus:ring-1 focus:ring-blue-900"
               value={selectedYear}
               onChange={e => setSelectedYear(Number(e.target.value))}
             >
               {years.map(year => (
                 <option key={year} value={year}>{year}</option>
               ))}
             </select>
           </div>
           
          
         </div>
       </div>
     );
}

export default SelectYear