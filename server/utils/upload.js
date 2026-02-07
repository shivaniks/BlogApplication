import multer from 'multer'
import {GridFsStorage} from 'multer-gridfs-storage'
import dotenv from 'dotenv'
dotenv.config()



const storage =new GridFsStorage({
    url:"mongodb+srv://sanchali:sanchali@map-user.eloibvw.mongodb.net/blog?retryWrites=true&w=majority",
    options:{useNewUrlParser:true},
    file:(req,file)=>{
        const match =["image/png","image/jpg"];
        if(match.indexOf(file.memetype)===-1){
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})
export default multer({storage})