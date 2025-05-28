import DepLogo from "./dep-logo";
import LogoutButton from "./logout-button";

export default function Header() {
    return (
        <div className={`flex w-full justify-between items-center bg-blue-900 p-4`}>
        <div className="flex h-20 shrink-0 items-center justify-start rounded-lg p-4 md:h-52">
            <DepLogo />
            <p className='text-white md:text-5xl font-bold'>Pesticide Surveys</p>
        </div>
            <LogoutButton />
        </div>
    )
}