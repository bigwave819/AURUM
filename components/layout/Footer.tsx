"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { name: "Collection", path: "/collection" },
    { name: "Watches", path: "/watch" },
    { name: "Contact", path: "/contact" },
];


const socialLinks = [
    {
        name: "Instagram",
        href: "https://instagram.com",
        image: "/insta.png",
    },
    {
        name: "Facebook",
        href: "https://facebook.com",
        image: "/face.webp",
    },
    {
        name: "Twitter",
        href: "https://twitter.com",
        image: "/X.webp",
    },
];

export default function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer
            style={{
                backgroundColor: "#3A2F22",
                borderTop: "0.5px solid #5A4A35",
            }}
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-14">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-10">
                    {/* Logo + tagline */}
                    <div>
                        <h2
                            className="text-xl font-medium tracking-[0.2em]"
                            style={{ color: "#F5EDE3" }}
                        >
                            AURUM
                        </h2>

                        <p
                            className="text-xs mt-2 max-w-xs"
                            style={{ color: "#9E9185" }}
                        >
                            Fine horology, chosen for permanence.
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-row sm:flex-col gap-5 sm:gap-2.5 flex-wrap">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={link.path}
                                className="text-xs tracking-wide transition-colors duration-300"
                                style={{ color: "#B5A088" }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#F5EDE3")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#B5A088")
                                }
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Social icons */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ name, href, image }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300"
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#4D3F2E";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                }}
                            >
                                <Image
                                    src={image}
                                    alt={name}
                                    width={18}
                                    height={18}
                                    className="object-contain"
                                />
                            </a>
                        ))}
                    </div>

                    <div
                        className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                        style={{ borderTop: "0.5px solid #4D3F2E" }}
                    >
                        <p className="text-[11px]" style={{ color: "#7A6B58" }}>
                            © {new Date().getFullYear()} AURUM. All rights reserved.
                        </p>

                        <p className="text-[11px]" style={{ color: "#7A6B58" }}>
                            Kigali, Rwanda
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}