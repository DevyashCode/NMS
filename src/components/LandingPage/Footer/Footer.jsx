const data = [
    {
        heading: "LINKS",
        content: [
            {
                name: "Login",
                link: "/login"
            }
        ]
    },
    {
        heading: "COMMUNITIES",
        content: [
            {
                name: "MITS",
                link: "https://web.mitsgwalior.in/"
            },
            {
                name: "Software Development Club",
                link: "https://sdc.mitsgwalior.in/"
            },
        ]
    },
    {
        heading: "CONTACT INFORMATION",
        content: [
            {
                name: "Software Development Club",
                link: "https://sdc.mitsgwalior.in/"
            },
            {
                name: "Data Resource Center",
                link: ""
            },
            {
                name: "Utkarsh Gupta",
                link: ""
            },
            {
                name: "Ansh Mittal",
                link: ""
            },
            {
                name: "Devyash Rasela",
                link: "www.linkedin.com/in/devyash-rasela"
            },
            {
                name: "Suyash Sharma",
                link: ""
            },
        ]
    },
]

function Footer(props) {
    return (
        <div className="w-full border-t border-white/30 bg-black/95 px-4 sm:px-8 lg:px-20">
            {/* Main Footer Content */}
            <div className="w-full py-8 sm:py-10 lg:py-12">
                {/* Desktop Layout (3+ columns) */}
                <div className="hidden lg:flex gap-8">
                    {data.map((element, index) => {
                        return (
                            <div key={index} className="flex-1 max-w-xs">
                                <h1 className="text-white/90 text-lg xl:text-xl border-b border-white/50 pb-4 mb-6 font-semibold">
                                    {element.heading}
                                </h1>
                                <div className="space-y-3">
                                    {element.content.map((link, i) => {
                                        return (
                                            <h4 
                                                key={i} 
                                                className="text-white/80 text-sm xl:text-base hover:text-white/100 transition-colors duration-200 cursor-pointer"
                                                onClick={() => link.link && window.open(link.link, "_blank")}
                                            >
                                                {link.name}
                                            </h4>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Tablet Layout (2 columns) */}
                <div className="hidden md:grid lg:hidden grid-cols-2 gap-8">
                    {data.map((element, index) => {
                        return (
                            <div key={index} className="mb-8">
                                <h1 className="text-white/90 text-lg border-b border-white/50 pb-4 mb-6 font-semibold">
                                    {element.heading}
                                </h1>
                                <div className="space-y-3">
                                    {element.content.map((link, i) => {
                                        return (
                                            <h4 
                                                key={i} 
                                                className="text-white/80 text-sm hover:text-white/100 transition-colors duration-200 cursor-pointer"
                                                onClick={() => link.link && window.open(link.link, "_blank")}

                                            >
                                                {link.name}
                                            </h4>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Mobile Layout (1 column) */}
                <div className="md:hidden space-y-8">
                    {data.map((element, index) => {
                        return (
                            <div key={index}>
                                <h1 className="text-white/90 text-base sm:text-lg border-b border-white/50 pb-3 mb-4 font-semibold">
                                    {element.heading}
                                </h1>
                                <div className="space-y-2">
                                    {element.content.map((link, i) => {
                                        return (
                                            <h4 
                                                key={i} 
                                                className="text-white/80 text-sm hover:text-white/100 transition-colors duration-200 cursor-pointer"
                                                onClick={() => link.link && window.open(link.link, "_blank")}
                                            >
                                                {link.name}
                                            </h4>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white/30 py-4 sm:py-6 flex items-center justify-center">
                <h3 className="text-white/80 text-xs sm:text-sm lg:text-base text-center leading-relaxed">
                    © 2025 NMS MITS : Software Development Club
                </h3>
            </div>
        </div>
    );
}

export default Footer;
