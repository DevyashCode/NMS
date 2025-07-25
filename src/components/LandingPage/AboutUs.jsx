import { ContainerScroll } from "../ui/container-scroll-animation";
import image from "../../assets/Dashboard.png"

function AboutUs() {
    return (
        <div className="w-full h-220 md:h-280 lg:h-300 bg-black py-10">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="text-3xl font-semibold text-white">
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                About Us
                            </span>
                            <br />
                            Network Management with Nmap: Uncovering Key Insights on Switches, Servers, and Wi-Fi
                        </h1>
                    </>
                }
                footerComponent={
                    <>
                        <h1 className="text-md font-semibold text-white px-5 lg:mt-10">
                            In a Network Management System (NMS), Nmap is a key tool for monitoring and managing ports and IP addresses. By using Nmap within an NMS, administrators can quickly identify open or closed ports, crucial for maintaining network security and performance. The tool also provides detailed mapping of IP addresses across the network, enabling effective tracking of devices and monitoring of network activity.
                        </h1>
                    </>
                }
            >
                {/* <img
                    src={image}
                    alt="hero"
                    size="cover"
                    className="mx-auto rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                /> */}
                <img
                    src={image}
                    alt="hero"
                    className="mx-auto rounded-xl sm:rounded-2xl object-contain h-full w-full object-left-top max-w-full"
                    draggable={false}
                    loading="lazy" // Performance optimization
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw" // Responsive sizing
                />

            </ContainerScroll>
        </div>
    );
}

export default AboutUs;