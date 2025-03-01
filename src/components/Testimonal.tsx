import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";
import Highlight from "./Highlight";

const reviews = [
    {
        name: "Mayank",
        username: "Delhi",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Priya",
        username: "Mumbai",
        body: "Blaze Cart has a fantastic selection! The customer service is top-notch",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "Nikhil",
        username: "Bangalore",
        body: "Super fast delivery and excellent product quality. Highly recommended!",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Aarushi",
        username: "Dehradun",
        body: "The prices are great, and the variety is impressive. Will shop again!",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Simran",
        username: "Ludhiana",
        body: "Loved the packaging and the authentic products. A great experience!",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "Ravi",
        username: "Chennai",
        body: "Authentic products with a royal touch! Loved the ethnic collection.",
        img: "https://avatar.vercel.sh/james",
    },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
    img,
    name,
    username,
    body,
}: {
    img: string;
    name: string;
    username: string;
    body: string;
}) => {
    return (
        <figure
            className={cn(
                "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={img} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">{body}</blockquote>
        </figure>
    );
};

export function Testimonials() {
    return (
        <div className="mt-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-center tracking-tighter font-bold">
                Guaranteed Customer <Highlight>Satisfaction</Highlight>
            </h1>
            <p className="mt-4 mb-5 text-md md:text-xl text-muted-foreground text-center">
                Hear from our happy customers and see why they love our service.
            </p>
            <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.username} {...review} />
                    ))}
                </Marquee>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
        </div>
    );
}