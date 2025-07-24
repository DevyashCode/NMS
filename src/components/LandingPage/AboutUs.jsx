import { ContainerScroll } from "../ui/container-scroll-animation";
import image from "../../assets/Dashboard.png"

function AboutUs() {
    return (
        <div className="w-full h-350 bg-black">
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
                        <h1 className="text-2xl font-semibold text-white mt-10">
                            In a Network Management System (NMS), Nmap is a key tool for monitoring and managing ports and IP addresses. By using Nmap within an NMS, administrators can quickly identify open or closed ports, crucial for maintaining network security and performance. The tool also provides detailed mapping of IP addresses across the network, enabling effective tracking of devices and monitoring of network activity.
                        </h1>
                    </>
                }
            >
                <img
                    src={image}
                    alt="hero"
                    height={720}
                    width={1400}
                    size="contain"
                    className="mx-auto rounded-2xl object-fit h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}

export default AboutUs;