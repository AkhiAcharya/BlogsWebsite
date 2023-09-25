import { postComment } from "@/firebase";


export default async function handler(req, res) {
    const {method} = req;
    if (method === 'POST'){
        const { id, author, body } = req.body;
        try {
            await postComment(id, author, body);
            res.status(200).json({ message: 'You have posted successfully' });
        } catch (error) {
            console.error('Error writing to Firebase:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}