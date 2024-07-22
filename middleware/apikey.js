function apiKey(req,res,next){
    const api_key_local='1234567';
    console.log(req.query.api_key);
    let api_key_url=req.query.api_key;
    //we are checking whether the api key is coming in request and whether it is matching with local api_Key
    //if it is matching and there we will call next() means process the request
    if(api_key_url && api_key_url===api_key_local){
        next();
    }else{
        res.json({
            error:"Request not processed."
        })
    }
    
}

module.exports=apiKey;