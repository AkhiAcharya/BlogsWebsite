import { createUser } from "@/firebase";


export default async function handler(req, res) {
    const {method} = req;
    if (method === 'POST'){
        const { email, password } = req.body;
        try {
            const user = await createUser(email, password);
            if (!user) {
                res.status(400).json({ error: 'Failed to create user.' });
                return;
            }
            res.status(200).json({ uid: user.uid, email: user.email })
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    } else {
        // Handle other HTTP methods
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}      