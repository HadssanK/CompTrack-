import jwt from "jsonwebtoken";

 export const UserAuth = async (req , res , next) =>{
    const {Token} = req.cookies;
      if(!Token){
        return res.json({success:false , message:"Not Authorized Login Again"})
      }
      try{
        const tokenDecode = jwt.verify(Token , "MySecurty")
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


