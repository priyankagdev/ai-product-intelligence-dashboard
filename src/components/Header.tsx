type HeaderProps = {
    title: string;
    subTitle: string;
};

function Header({ title, subTitle }: HeaderProps) {
    return (
        <header className="mb-8 border-b border-[#D9E2EC] pb-6">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {title}
            </h1>

            <p className="mt-2 text-gray-500">
                {subTitle}
            </p>
        </header>
    );
}

export default Header;