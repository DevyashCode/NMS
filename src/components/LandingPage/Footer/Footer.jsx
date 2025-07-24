const data = [
    {
        heading: "LINKS",
        content: [
            {
                name: "Login",
                link: ""
            }
        ]
    },
    {
        heading: "COMMUNITIES",
        content: [
            {
                name: "MITS",
                link: ""
            },
            {
                name: "Software Development Club",
                link: ""
            },
        ]
    },
    {
        heading: "CONTACT INFORMATION",
        content: [
            {
                name: "Software Development Club",
                link: ""
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
                link: ""
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
        <div className="w-full h-full border-t-1 border-white/30 bg-black/95 px-20">
            <div className="h-[85%] w-full flex">
                {data.map((element, index) => {
                    return (
                        <div key={index} className="h-full w-1/4 p-10">
                            <h1 className="text-white/90 text-xl border-b-1 border-white/50 pb-5 mb-5">
                                {element.heading}
                            </h1>
                            {element.content.map((link,i)=>{
                                return <h4 className="text-white/80 mb-2">{link.name}</h4>
                            })}
                        </div>
                    )
                })}
            </div>
            <div className="h-[15%] w-full border-t-1 border-white/30 flex items-center justify-center">
                <h3 className="text-white/80 text-center">© 2025 NMS MITS : Software Development Club</h3>
            </div>
        </div>
    );
}

export default Footer;