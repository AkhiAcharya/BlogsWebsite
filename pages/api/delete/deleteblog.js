import { deleteBlog } from "@/firebase";


export default async function handler(req, res) {
    const {method} = req;
    if (method === 'DELETE'){
        const { id } = req.body;
        try {
            await deleteBlog(id);
            res.status(200).json({ message: 'Deleted successfully' });
        } catch (error) {
            console.error('Error writing to Firebase:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}