import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

type Post = {
    slug: string;
    title: string;
};

type LoaderData = {
    posts: Array<Post>;
};


export const loader = async () => {
    return json<LoaderData>({
        posts: [
            {
                slug: "my-first-post",
                title: "My First Post",
            },
            {
                slug: "90s-mixtape",
                title: "A Mixtape I Made Just For You",
            },
        ],
    });
};

export default function Posts() {
    const { posts } = useLoaderData();
    console.log(posts);
    return (
        <main>
            <h1>Posts</h1>
            <Link to="admin" className="text-red-600 underline">
                Admin
            </Link>
        </main>
    );
}

