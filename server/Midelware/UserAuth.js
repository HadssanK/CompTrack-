import jwt from "jsonwebtoken";

 export const UserAuth = async (req , res , next) =>{
    const {token} = req.cookies;
      if(!token){
        return res.json({success:false , message:"Not Authorized Login Again"})
      }
      try{
        const tokenDecode = jwt.verify(token , "MySecurty")
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        
        }else{
            return res.json({success : false , message :"Not Authorized Login Again"})
        }
        next();
      }catch(err){
        return res.json({success : false , message :err.message})
      }
}


