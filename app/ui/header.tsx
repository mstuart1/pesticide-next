import DepLogo from "./dep-logo";

export default function Header() {
    return (
        <div className="flex h-20 shrink-0 items-center justify-start rounded-lg bg-blue-900 p-4 md:h-52">
                <DepLogo />
                <p className='md:text-5xl font-bold'>Pesticide Surveys</p>
              </div>
    )
}