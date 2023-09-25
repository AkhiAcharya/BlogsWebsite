import { getBlogposts } from "@/firebase";


export default async function handler(req, res) {
    const {method} = req;
    if (method === 'GET'){
        try {
            const blogposts = await getBlogposts();
            res.status(200).json({blogposts: blogposts});
        } catch (error) {
            console.error('Error writing to Firebase:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}