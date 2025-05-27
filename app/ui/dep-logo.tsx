import depIcon from '@/public/white_njdep_logo.png';
import Image from 'next/image';
import { roboto } from './fonts';


export default function DepLogo() {
  return (
    <div
      className={`${roboto.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <Image src={depIcon}
      priority
       width={1246} height={1400} // don't have to provide width and height when statically imported
        alt="NJDEP Logo" className="h-12 w-12 md:h-40 md:w-40" /> */}
      {/* <p className="text-[44px]">NJDEP</p> */}
    </div>
  );
}
