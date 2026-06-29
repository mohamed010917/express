
import jwt from "jsonwebtoken" ;

export default function AuthMiddleware(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1];
    console.log("token from auth middleware" , token) ;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.userId = decoded.id;
        ;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}