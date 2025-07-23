import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.startsWith('Bearer ') 
            ? authHeader.substring(7) 
            : authHeader; // Extract token from Authorization header
    
        if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
        }
    
        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET);
        
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
}

export default auth;